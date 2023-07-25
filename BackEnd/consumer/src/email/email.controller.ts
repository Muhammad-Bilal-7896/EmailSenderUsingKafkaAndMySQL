import { Controller } from '@nestjs/common';
import {
  Ctx,
  KafkaContext,
  MessagePattern,
  Payload,
} from '@nestjs/microservices';
import { EmailService } from './email.service';

import { v4 as uuidv4 } from 'uuid';

@Controller()
export class EmailController {
  constructor(private readonly emailService: EmailService) {}

  @MessagePattern('medium.rocks')
  async readMessageAndSendEmail(
    @Payload() emailData: any,
    @Ctx() context: KafkaContext,
  ) {
    const originalMessage = context.getMessage();

    // const response =
    //   `Receiving a new message from topic: medium.rocks: ` +
    //   JSON.stringify(originalMessage.value);
    // console.log(response);

    let message = JSON.stringify(originalMessage.value);

    this.emailService.sendEmail(message, emailData);
  }
}
