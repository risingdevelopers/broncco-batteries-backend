import { AppModule } from './app.module';
import helmet from 'helmet';
import rateLimit, { ipKeyGenerator } from 'express-rate-limit';
import { ValidationPipe, Logger } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as compression from 'compression';
import * as hpp from 'hpp';
import { NestFactory } from '@nestjs/core';

async function bootstrap() {
  const logger = new Logger('Bootstrap');
  logger.log('Starting application with enhanced security...');

  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    cors: {
      origin: [
        'https://your-frontend-domain1.com',
        'https://your-frontend-domain2.com',
        'http://localhost:4200'
      ],
      methods: ['GET', 'POST', 'PUT', 'DELETE'],
      allowedHeaders: ['Content-Type', 'Authorization'],
      credentials: true,
      maxAge: 3600, // 1 hour in seconds
    },
  });

  // Apply Helmet with enhanced security settings
  app.use(
    helmet({
      contentSecurityPolicy: {
        directives: {
          defaultSrc: ["'self'"],
          scriptSrc: ["'self'", "'unsafe-inline'", "'unsafe-eval'"],
          styleSrc: ["'self'", "'unsafe-inline'"],
          imgSrc: ["'self'", 'data:'],
          connectSrc: ["'self'"],
          fontSrc: ["'self'"],
          objectSrc: ["'none'"],
          mediaSrc: ["'self'"],
          frameSrc: ["'none'"],
        },
      },
      crossOriginEmbedderPolicy: true,
      crossOriginOpenerPolicy: true,
      crossOriginResourcePolicy: { policy: 'same-site' },
      dnsPrefetchControl: { allow: false },
      frameguard: { action: 'deny' },
      hidePoweredBy: true,
      hsts: { maxAge: 31536000, includeSubDomains: true, preload: true },
      ieNoOpen: true,
      noSniff: true,
      originAgentCluster: true,
      permittedCrossDomainPolicies: { permittedPolicies: 'none' },
      referrerPolicy: { policy: 'no-referrer' },
      xssFilter: true,
    }),
  );

  // Compression to improve performance and reduce attack surface
  app.use(compression());

  // Protect against HTTP Parameter Pollution attacks
  app.use(hpp());

  // Enhanced rate limiting
  app.use(
    rateLimit({
      windowMs: 15 * 60 * 1000, // 15 minutes
      max: 100, // limit each IP to 100 requests per windowMs
      standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
      legacyHeaders: false, // Disable the `X-RateLimit-*` headers
      skipSuccessfulRequests: false, // Count successful requests against the rate limit
      message: 'Too many requests from this IP, please try again later',
      // Use a key generator that properly handles IPv6 addresses
      keyGenerator: (req) => {
        // Normalize IP address and combine with route for more granular rate limiting
        return `${ipKeyGenerator(req.ip)}-${req.originalUrl}`;
      },
    }),
  );

  // More strict rate limiting for authentication routes (if any)
  app.use(
    '/auth',
    rateLimit({
      windowMs: 60 * 60 * 1000, // 1 hour
      max: 5, // limit each IP to 5 requests per hour
      message: 'Too many authentication attempts, please try again later',
      standardHeaders: true,
      legacyHeaders: false,
      // Use a key generator that properly handles IPv6 addresses
      keyGenerator: (req) => ipKeyGenerator(req.ip),
    }),
  );

  // Body parser with size limits to prevent DoS attacks
  app.useBodyParser('json', { limit: '10kb' });
  app.useBodyParser('urlencoded', { extended: true, limit: '10kb' });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Strip properties not in DTO
      forbidNonWhitelisted: true, // Throw error if non-whitelisted properties are present
      transform: true, // Transform payloads to DTO instances
      transformOptions: { enableImplicitConversion: true },
      forbidUnknownValues: true, // Throw error on unknown objects
      disableErrorMessages: process.env.NODE_ENV === 'production', // Hide error details in production
    }),
  );

  // Get port from command line arguments or environment variables
  const port = process.env.PORT || 3000;
  await app.listen(port);
  logger.log(`Application is running on: http://localhost:${port}`);
}
bootstrap();
