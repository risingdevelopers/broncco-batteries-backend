import { BadRequestException, Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
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
    // Check honeypot field - if filled, it's a bot
    if (contactData.website) {
      this.logger.warn('Bot detected via honeypot field');
      // Return success to not alert the bot
      return { success: true, message: 'Contact message sent successfully' };
    }

    // Validate email configuration exists
    const emailTo = this.configService.get<string>('contactUs.notificationEmail');
    if (!emailTo) {
      this.logger.error('CONTACT_US_NOTIFICATION_EMAIL is not configured');
      throw new InternalServerErrorException('Email notification is not configured');
    }

    // Sanitize input data
    const sanitizedData = {
      name: contactData.name.trim(),
      email: contactData.email.trim().toLowerCase(),
      phone: contactData.phone.trim(),
      message: contactData.message.trim(),
    };

    const contactEntity = this.contactedRepository.create(sanitizedData);
    let savedContact: Contacted;

    try {
      // Save to database first
      savedContact = await this.contactedRepository.save(contactEntity);
      this.logger.log(`Contact saved with ID: ${savedContact.id}`);
    } catch (error) {
      this.logger.error('Database error while saving contact', error);
      throw new BadRequestException('Failed to save contact message');
    }

    // Try to send email, but don't fail the request if email fails
    try {
      const messageType = this.configService.get('contactUs.messageType');
      await this.emailService.sendEmail(
        emailTo,
        savedContact,
        messageType,
      );
      this.logger.log(`Email sent successfully for contact ID: ${savedContact.id}`);
    } catch (error) {
      // Log error but don't throw - contact is already saved
      this.logger.error(`Failed to send email for contact ID: ${savedContact.id}`, error);
      // You might want to implement a retry queue here
    }

    const successMessage = this.configService.get('contactUs.successMessage');
    return { success: true, message: successMessage };
  }
}
