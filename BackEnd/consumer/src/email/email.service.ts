import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Email } from './email.entity';
import { send } from 'process';
import { Server, Socket } from 'socket.io';

@Injectable()
export class EmailService {
  constructor(
    @InjectRepository(Email)
    private readonly emailRepository: Repository<Email>,
  ) {}

  // For Socket.io
  private io: Server;

  setSocketInstance(io: Server) {
    this.io = io;
  }
  // For Socket.io

  sendEmail(message: string, emailData: any) {
    const {
      id,
      to,
      subject,
      text,
      html,
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
        text,
        html,
        time_sent,
        email_number,
      },
    );

    try {
      // Send the email
      this.send(id, email_number, to, subject, text, html);

      const response = `In Consumer! Email No. ${email_number} sent successfully to ${to} and status updated to 'sent'`;
      console.log(response);
      return response;
    } catch (error) {
      // Handle any errors that may occur during email sending
      console.error('Error sending email:', error.message);
      throw error;
    }
  }

  async send(
    id: string,
    email_number: number,
    to: string,
    subject: string,
    text: string,
    html: string,
  ) {
    // Send the email using the MailerService or any other email service of your choice
    // await this.mailerService.sendMail({
    //   to,
    //   subject,
    //   text,
    //   html,
    // });

    // Emit an event to update the number of emails being sent
    if (this.io) {
      this.io.emit('emailSent', { email_number, to, subject, text, html });
    }

    // @@@ Update the status of the email to 'sent' in the database @@@
    await this.emailRepository.update(id, { status: 'sent' });

    // console.log(`Email ${email_number} sent successfully`);
  }
}
