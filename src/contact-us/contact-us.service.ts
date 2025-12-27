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
      const mailTo: string = this.configService.get('mail.to');
      await this.emailService.sendEmail(mailTo, savedContact, 'Message');
      return { success: true, message: 'Message sent successfully.' };
    } catch (error) {
      throw new BadRequestException(error);
    }
  }
}
