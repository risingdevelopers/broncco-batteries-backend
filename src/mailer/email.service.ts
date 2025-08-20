import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class EmailService {
  constructor(private readonly mailerService: MailerService) {}

  async sendEmail(
    email: string,
    appointment: { [key: string]: any },
    type: 'Quote' | 'Appointment' | 'Message' = 'Appointment',
  ) {
    console.log(email, appointment);
    try {
      // Create HTML table from appointment details
      const tableRows = Object.entries(appointment)
        .filter(
          ([key, value]) =>
            value !== null && value !== undefined && key !== 'id',
        )
        .map(
          ([key, value]) => `
          <tr>
            <td style="padding: 8px; border: 1px solid #ddd; text-transform: capitalize;">
              ${key.replace(/([A-Z])/g, ' $1').toLowerCase()}
            </td>
            <td style="padding: 8px; border: 1px solid #ddd;">
              ${value instanceof Date ? value.toLocaleString() : value}
            </td>
          </tr>
        `,
        )
        .join('');

      const htmlContent = `
        <div style="font-family: Arial, sans-serif;">
          <p>Hi Admin,</p>
          <p>A customer has made a new ${type}</p>
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

      console.log(htmlContent);

      const result = await this.mailerService.sendMail({
        to: email,
        subject: `New ${type} Notification`,
        html: htmlContent,
      });

      console.log('Email sent successfully:', result);
      return result;
    } catch (error: any) {
      console.error('Email sending error:', error);
      throw new HttpException(
        'Failed to send email',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
