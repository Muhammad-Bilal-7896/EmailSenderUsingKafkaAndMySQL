import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { EmailModule } from './email/email.module';
import { EmailController } from './email/email.controller';
import { EmailService } from './email/email.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Email } from './email/email.entity';
import { GatewayModule } from './gateway/gateway.module';
import { MyGateWay } from './gateway/gateway';

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
      type: 'mysql', // Corrected 'type' value to 'mysql'
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
    GatewayModule,
  ],
  controllers: [EmailController],
  providers: [EmailService, MyGateWay],
})
export class AppModule {}
