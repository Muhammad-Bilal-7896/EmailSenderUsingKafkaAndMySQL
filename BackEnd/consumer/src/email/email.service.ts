import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Email } from './email.entity';

@Injectable()
export class EmailService {
  constructor(
    @InjectRepository(Email)
    private readonly emailRepository: Repository<Email>,
  ) {}

  async sendEmail(message: string, emailData: any) {
    const {
      id,
      to,
      subject,
      body,
      time_sent,
      email_number,
      num_emails,
      status,
    } = emailData;

    console.log(
      `Consumer! Received email ${email_number}, message: ${message} request at ${time_sent} :`,
      {
        to,
        subject,
        body,
        time_sent,
        email_number,
      },
    );

    try {
      // Send the email
      await this.send(id, email_number, to, subject, body);

      const response = `In Consumer! Email No. ${email_number} sent successfully to ${to} and status updated to 'sent'`;
      console.log(response);
      return response;
    } catch (error) {
      console.error('Error sending email:', error.message);
      throw error;
    }
  }

  async send(
    id: string,
    email_number: number,
    to: string,
    subject: string,
    body: string,
  ) {
    // Send the email using the MailerService or any other email service of your choice
    // await this.mailerService.sendMail({
    //   to,
    //   subject,
    //   body,
    // });

    // @@@ Update the status of the email to 'sent' in the database @@@
    await this.emailRepository.update(id, { status: 'sent' });
  }
}
