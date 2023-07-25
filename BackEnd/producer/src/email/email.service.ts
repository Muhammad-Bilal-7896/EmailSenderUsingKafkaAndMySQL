import { Inject, Injectable } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Email } from './email.entity';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class EmailService {
  constructor(
    @Inject('any_name_i_want') private readonly client: ClientKafka,
    @InjectRepository(Email)
    private readonly emailRepository: Repository<Email>,
  ) {}

  getHello(): string {
    return 'Hello World From Produce Email!';
  }

  kafkaProducer(): any {
    for (let i = 0; i < 10; i++) {
      this.client.emit('medium.rocks', {
        foo: 'bar',
        data: new Date().toString(),
      });
    }

    // return proper response to the client
    return {
      message:
        'Message emitted from producer and sent successfully to consumer',
      status: 200,
    };
  }

  // The actual produce Email Method
  produceEmail(emailData: any) {
    const { to, numEmails, subject, text, html } = emailData;

    let date = new Date().toLocaleString();

    for (let i = 0; i < numEmails; i++) {
      // @@@ Sending each email to the database with status 'queued' @@
      let id = Math.floor(Math.random() * 1000000000000000).toString();
      let status = 'queued';

      const email = new Email();
      email.id = id;
      email.to = to;
      email.subject = subject;
      email.text = text;
      email.html = html;
      email.timeSent = date;
      email.emailNumber = i;
      email.numEmails = numEmails;
      email.status = status; // Set the initial status to 'queued'
      this.emailRepository.save(email);
      //

      // @@@ Sending each email to the Kafka topic: medium-rocks @@
      this.client.emit('medium.rocks', {
        id,
        to,
        subject,
        text,
        html,
        time_sent: date,
        email_number: i,
        num_emails: numEmails,
        status: status,
      });
      //
    }

    return {
      message: `Congratulations 🎉! Emails sent successfully to the Kafka topic: medium.rocks`,
      status: 200,
    };
  }
}
