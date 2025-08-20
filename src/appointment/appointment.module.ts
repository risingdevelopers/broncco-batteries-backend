import { Module } from '@nestjs/common';
import { AppointmentController } from './appointment.controller';
import { AppointmentService } from './appointment.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Appointment } from './entity/appointment.entity';
import { MailerModule } from '../mailer/mailer.module';
import { CarColor } from './entity/carColor.entity';
import { Cities } from './entity/cities.entity';
import { Quote } from './entity/quote.entity';

@Module({
  controllers: [AppointmentController],
  providers: [AppointmentService],
  imports: [
    TypeOrmModule.forFeature([Appointment, CarColor, Cities, Quote]),
    MailerModule,
  ],
})
export class AppointmentModule {}
