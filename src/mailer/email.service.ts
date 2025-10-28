import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class EmailService {
  private readonly logger = new Logger(EmailService.name);

  constructor(private readonly mailerService: MailerService) {}

  private escapeHtml(text: string): string {
    const map: { [key: string]: string } = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#039;',
    };
    return text.replace(/[&<>"']/g, (m) => map[m]);
  }

  async sendEmail(
    email: string,
    appointment: { [key: string]: any },
    type: 'Quote' | 'Appointment' | 'Message' = 'Appointment',
  ) {
    if (!email) {
      throw new HttpException(
        'Email address is required',
        HttpStatus.BAD_REQUEST,
      );
    }

    try {
      // Create HTML table from appointment details with XSS protection
      const tableRows = Object.entries(appointment)
        .filter(
          ([key, value]) =>
            value !== null && value !== undefined && key !== 'id',
        )
        .map(
          ([key, value]) => {
          const safeKey = this.escapeHtml(
            key.replace(/([A-Z])/g, ' $1').toLowerCase(),
            const safeValue = value instanceof Date 
              ? value.toLocaleString() 
              : this.escapeHtml(String(value));
            
            return `
          <tr>
            <td style="padding: 8px; border: 1px solid #ddd; text-transform: capitalize;">
              ${safeKey}
            </td>
            <td style="padding: 8px; border: 1px solid #ddd;">
              ${safeValue}
            </td>
          </tr>
        `;
          },
        )
        .join('');

      const safeType = this.escapeHtml(type);
      const htmlContent = `
        <div style="font-family: Arial, sans-serif;">
          <p>Hi Admin,</p>
          <p>A customer has made a new ${safeType}</p>
          <h2>Find the details below:</h2>
          <table style="border-collapse: collapse; width: 100%; margin-top: 20px;">
            <thead>
              <tr>
                <th style="padding: 12px; border: 1px solid #ddd; background-color: #f4f4f4; text-align: left;">Detail</th>
                <th style="padding: 12px; border: 1px solid #ddd; background-color: #f4f4f4; text-align: left;">Value</th>
              </tr>
            </thead>
            <tbody>
              ${tableRows}
            </tbody>
          </table>
        </div>
      `;

      const result = await this.mailerService.sendMail({
        to: email,
        subject: `New ${safeType} Notification`,
        html: htmlContent,
      });

      this.logger.log(`Email sent successfully to ${email}`);
      return result;
    } catch (error: any) {
      this.logger.error(`Email sending error to ${email}:`, error.message);
      throw new HttpException(
        'Failed to send email',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
