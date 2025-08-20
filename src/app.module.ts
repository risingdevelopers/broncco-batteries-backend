import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { ChooseBatteriesModule } from './choose-batteries/choose-batteries.module';
import { AppointmentModule } from './appointment/appointment.module';
import { MailerModule } from './mailer/mailer.module';
import AppConfig from './config/app-config';

@Module({
  imports: [
    ChooseBatteriesModule,
    ConfigModule.forRoot({
      load: [AppConfig],
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DATABASE_HOST,
      port: Number(process.env.DATABASE_PORT),
      username: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      autoLoadEntities: true,
      synchronize: true,
    }),
    AppointmentModule,
    MailerModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
