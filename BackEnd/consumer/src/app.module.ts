import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { TypeOrmModule } from '@nestjs/typeorm';

// Import the Email files
import { EmailController } from './email/email.controller';
import { Email } from './email/email.entity';
import { EmailModule } from './email/email.module';
import { EmailService } from './email/email.service';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'any_name_i_want',
        transport: Transport.KAFKA,
        options: {
          client: {
            clientId: 'any_client_id_i_want',
            brokers: ['localhost:29092'],
          },
          consumer: {
            groupId: 'an_unique_string_id',
          },
        },
      },
    ]),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '123321123',
      database: 'email_sender_db',
      entities: [Email],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([Email]),
    EmailModule,
  ],
  controllers: [EmailController],
  providers: [EmailService],
})
export class AppModule {}
