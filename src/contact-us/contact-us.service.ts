import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Contacted } from './entity/contacted.entity';
import { ContactUsDto } from './dto';
import { EmailService } from '../mailer/email.service';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class ContactUsService {
  constructor(
    @InjectRepository(Contacted)
    private readonly contactedRepository: Repository<Contacted>,
    private readonly emailService: EmailService,
    private readonly configService: ConfigService,
  ) {}

  async create(contactData: ContactUsDto) {
    const contactEntity = this.contactedRepository.create(contactData);

    try {
      const savedContact = await this.contactedRepository.save(contactEntity);
      const emailTo = this.configService.get('contactUs.notificationEmail');
      const messageType = this.configService.get('contactUs.messageType');
      await this.emailService.sendEmail(
        emailTo,
        savedContact,
        messageType,
      );
      const successMessage = this.configService.get('contactUs.successMessage');
      return { success: true, message: successMessage };
    } catch (error) {
      console.log(error);
      const errorMessage = this.configService.get('contactUs.errorMessage');
      throw new BadRequestException(errorMessage);
    }
  }
}
