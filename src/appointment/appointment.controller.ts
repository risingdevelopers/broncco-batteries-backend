import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateAppointmentDto } from './dto/appointment.dto';
import { AppointmentService } from './appointment.service';
import { QuoteDto } from './dto/quote.dto';

@Controller('appointment')
export class AppointmentController {
  constructor(private readonly appointmentService: AppointmentService) {}
  @Post('create')
  createAppointment(@Body() appointmentDetails: CreateAppointmentDto) {
    return this.appointmentService.saveAppointment(appointmentDetails);
  }

  @Post('save-quote')
  createQuote(@Body() quoteDto: QuoteDto) {
    return this.appointmentService.saveQuote(quoteDto);
  }

  @Get('car-colors')
  getCarColors() {
    return this.appointmentService.getCarColors();
  }
  @Get('cities')
  getCities() {
    return this.appointmentService.getCities();
  }
}
