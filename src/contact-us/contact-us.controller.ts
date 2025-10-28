import { Body, Controller, Post } from '@nestjs/common';
import { ContactUsService } from './contact-us.service';
import { ContactUsDto } from './dto';
import { Throttle } from '@nestjs/throttler';

@Controller('contact-us')
export class ContactUsController {
  constructor(private readonly contactUsService: ContactUsService) {}

  @Post('create')
  @Throttle({ default: { limit: 3, ttl: 60000 } })
  create(@Body() contactData: ContactUsDto) {
    return this.contactUsService.create(contactData);
  }
}
