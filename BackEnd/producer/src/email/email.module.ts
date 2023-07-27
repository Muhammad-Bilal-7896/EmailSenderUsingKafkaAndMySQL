import { Module } from '@nestjs/common';
import { EmailService } from './email.service';
import { EmailController } from './email.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Email } from './email.entity';
import { MyGateWay } from 'src/gateway/gateway';
import { GatewayModule } from 'src/gateway/gateway.module';

@Module({
  imports: [
    GatewayModule,
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
  providers: [EmailService, MyGateWay],
})
export class EmailModule {}
