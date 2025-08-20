import { Module } from '@nestjs/common';
import { MailerCoreModule } from '@nestjs-modules/mailer/dist/mailer-core.module';
import { ConfigService } from '@nestjs/config';
import { EmailService } from './email.service';

@Module({
  imports: [
    MailerCoreModule.forRootAsync({
      useFactory: (config: ConfigService) => ({
        transport: {
          host: config.get('mail.host'),
          port: config.get('mail.port'),
          secure: config.get('mail.secure'),
          auth: {
            user: config.get('mail.auth.user'),
            pass: config.get('mail.auth.pass'),
          },
        },
        defaults: {
          from: `"No Reply" <${config.get('mail.from')}>`,
        },
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [EmailService],
  exports: [EmailService],
})
export class MailerModule {}
