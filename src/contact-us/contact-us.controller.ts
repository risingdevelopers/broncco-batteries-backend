import { Body, Controller, Post } from '@nestjs/common';
import { ContactUsService } from './contact-us.service';
import { ContactUsDto } from './dto';

@Controller('contact-us')
export class ContactUsController {
  constructor(private readonly contactUsService: ContactUsService) {}

  @Post('create')
  create(@Body() contactData: ContactUsDto) {
    return this.contactUsService.create(contactData);
  }
}
