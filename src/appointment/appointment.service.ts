import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Appointment } from './entity/appointment.entity';
import { Repository } from 'typeorm';
import { CreateAppointmentDto } from './dto/appointment.dto';
import { EmailService } from '../mailer/email.service';
import { Cities } from './entity/cities.entity';
import { CarColor } from './entity/carColor.entity';
import { Quote } from './entity/quote.entity';
import { QuoteDto } from './dto/quote.dto';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppointmentService {
  private readonly logger = new Logger(AppointmentService.name);

  constructor(
    @InjectRepository(Appointment)
    private readonly appointmentRepository: Repository<Appointment>,
    @InjectRepository(Quote)
    private readonly quoteRepository: Repository<Quote>,
    @InjectRepository(Cities)
    private readonly citiesRepository: Repository<Cities>,
    @InjectRepository(CarColor)
    private readonly carColorRepository: Repository<CarColor>,
    private readonly emailService: EmailService,
    private readonly configService: ConfigService,
  ) {}

  async saveAppointment(appointment: CreateAppointmentDto) {
    const appointmentEntity = this.appointmentRepository.create(appointment);

    let savedAppointment: Appointment;
    try {
      savedAppointment = await this.appointmentRepository.save(appointmentEntity);
    } catch (error: any) {
      this.logger.error('Failed to save appointment', error?.stack ?? error);
      throw new BadRequestException('Failed to save appointment.');
    }

    // The booking is already persisted, so a notification failure must not be
    // reported to the caller as a failed booking - that causes duplicate
    // submissions. Log loudly instead.
    try {
      const mailTo: string = this.configService.get('mail.to');
      await this.emailService.sendEmail(mailTo, savedAppointment);
    } catch (error: any) {
      this.logger.error(
        `Appointment ${savedAppointment.id} saved but the notification email failed`,
        error?.stack ?? error,
      );
    }

    return savedAppointment;
  }

  async saveQuote(quote: QuoteDto) {
    const quoteEntity = this.quoteRepository.create(quote);

    let savedQuote: Quote;
    try {
      savedQuote = await this.quoteRepository.save(quoteEntity);
    } catch (error: any) {
      this.logger.error('Failed to save quote', error?.stack ?? error);
      throw new BadRequestException('Failed to save quote.');
    }

    try {
      const mailTo: string = this.configService.get('mail.to');
      await this.emailService.sendEmail(mailTo, savedQuote, 'Quote');
    } catch (error: any) {
      this.logger.error(
        `Quote ${savedQuote.id} saved but the notification email failed`,
        error?.stack ?? error,
      );
    }

    return savedQuote;
  }

  async getCarColors() {
    return await this.carColorRepository.find();
  }

  async getCities() {
    return await this.citiesRepository.find();
  }
}
