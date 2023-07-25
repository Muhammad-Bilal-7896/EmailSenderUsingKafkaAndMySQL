import { Controller, Get, Inject, Post, Body } from '@nestjs/common';
import { EmailService } from './email.service';
import { ClientKafka } from '@nestjs/microservices';

@Controller('email')
export class EmailController {
  constructor(
    private readonly emailService: EmailService,
    @Inject('any_name_i_want') private readonly client: ClientKafka,
  ) {}

  async onModuleInit() {
    ['medium.rocks'].forEach((key) =>
      this.client.subscribeToResponseOf(`${key}`),
    );
    await this.client.connect();
  }

  async onModuleDestroy() {
    await this.client.close();
  }

  @Get()
  getHello(): string {
    return this.emailService.getHello();
  }

  @Get('kafka-test')
  testKafka() {
    return this.client.emit('medium.rocks', {
      foo: 'bar',
      data: new Date().toString(),
    });
  }

  @Get('kafka-test-with-response')
  testKafkaWithResponse() {
    return this.client.send('medium.rocks', {
      foo: 'bar',
      data: new Date().toString(),
    });
  }

  @Get('/kafka-producer')
  kafkaProducerEndpoint() {
    return this.emailService.kafkaProducer(); 
  }

  @Post('/produceEmail')
  async produceEmail(@Body() emailData: any) {
    return this.emailService.produceEmail(emailData);
  }
}
