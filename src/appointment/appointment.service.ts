import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Appointment } from './entity/appointment.entity';
import { Repository } from 'typeorm';
import { CreateAppointmentDto } from './dto/appointment.dto';
import { EmailService } from '../mailer/email.service';
import { Cities } from './entity/cities.entity';
import { CarColor } from './entity/carColor.entity';
import { Quote } from './entity/quote.entity';
import { QuoteDto } from './dto/quote.dto';

@Injectable()
export class AppointmentService {
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
  ) {}

  async saveAppointment(appointment: CreateAppointmentDto) {
    const appointmentEntity = this.appointmentRepository.create(appointment);

    try {
      const savedAppointment =
        await this.appointmentRepository.save(appointmentEntity);
      await this.emailService.sendEmail(
        'raisenx24@gmail.com',
        savedAppointment,
      );
      return savedAppointment;
    } catch (error: any) {
      console.log(error);
      throw new BadRequestException('Failed to save appointment.');
    }
  }

  async saveQuote(quote: QuoteDto) {
    const quoteEntity = this.quoteRepository.create(quote);
    try {
      const savedQuote = await this.quoteRepository.save(quoteEntity);
      await this.emailService.sendEmail(
        'raisenx24@gmail.com',
        savedQuote,
        'Quote',
      );
      return savedQuote;
    } catch (error: any) {
      console.log(error);
      throw new BadRequestException('Failed to save quote.');
    }
  }

  async getCarColors() {
    return await this.carColorRepository.find();
  }

  async getCities() {
    return await this.citiesRepository.find();
  }
}
