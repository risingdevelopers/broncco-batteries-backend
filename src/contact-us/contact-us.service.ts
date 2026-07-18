import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Contacted } from './entity/contacted.entity';
import { ContactUsDto } from './dto';
import { EmailService } from '../mailer/email.service';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class ContactUsService {
  private readonly logger = new Logger(ContactUsService.name);

  constructor(
    @InjectRepository(Contacted)
    private readonly contactedRepository: Repository<Contacted>,
    private readonly emailService: EmailService,
    private readonly configService: ConfigService,
  ) {}

  async create(contactData: ContactUsDto) {
    const contactEntity = this.contactedRepository.create(contactData);

    let savedContact: Contacted;
    try {
      savedContact = await this.contactedRepository.save(contactEntity);
    } catch (error) {
      this.logger.error('Failed to save contact message', error?.stack ?? error);
      throw new BadRequestException('Failed to save message.');
    }

    // The message is stored; a notification failure must not be reported as a
    // failed submission or the sender will retry and duplicate it.
    try {
      const mailTo: string = this.configService.get('mail.to');
      await this.emailService.sendEmail(mailTo, savedContact, 'Message');
    } catch (error) {
      this.logger.error(
        `Contact message ${savedContact.id} saved but the notification email failed`,
        error?.stack ?? error,
      );
    }

    return { success: true, message: 'Message sent successfully.' };
  }
}
