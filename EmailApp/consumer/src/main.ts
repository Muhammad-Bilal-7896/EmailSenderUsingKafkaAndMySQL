import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.KAFKA,
      options: {
        client: {
          brokers: ['kafka:29092'],
        },
      },
    },
  );

  const app2 = await NestFactory.create(AppModule);

  app2.enableCors();

  await app.listen();
}
bootstrap();
