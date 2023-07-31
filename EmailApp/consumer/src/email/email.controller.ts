import { Controller, Get } from '@nestjs/common';
import {
  Ctx,
  KafkaContext,
  MessagePattern,
  Payload,
} from '@nestjs/microservices';
import { EmailService } from './email.service';

@Controller()
export class EmailController {
  constructor(private readonly emailService: EmailService) {}

  @Get()
  helloWorldConsumer() {
    return 'Hello world from kafka consumer';
  }

  @MessagePattern('mail')
  async readMessageAndSendEmail(
    @Payload() emailData: any,
    @Ctx() context: KafkaContext,
  ) {
    const originalMessage = context.getMessage();

    let message = JSON.stringify(originalMessage.value);

    this.emailService.sendEmail(message, emailData);
  }
}
