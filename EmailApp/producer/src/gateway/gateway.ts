import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  WsResponse,
} from '@nestjs/websockets';
import { Observable, from, map } from 'rxjs';
import { Server } from 'socket.io';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class MyGateWay {
  @WebSocketServer()
  server: Server;

  @SubscribeMessage('events')
  findAll(@MessageBody() data: any): Observable<WsResponse<number>> {
    console.log(
      'Socket Connected on Client and this is the message ==> ',
      data,
    );

    return from([1, 2, 3]).pipe(
      map((item) => ({ event: 'events', data: item })),
    );
  }

  emitEmailSentEvent(data: any) {
    this.server.emit('emailSent', data);
  }

  @SubscribeMessage('message')
  onNewMessage(@MessageBody() body: any) {
    console.log('Socket Message from client is here ==> ', body);
  }

  // Email Sent Event
  @SubscribeMessage('emailSent')
  onEmailSent(@MessageBody() body: any) {
    console.log(
      'Socket Email Sent from BackEnd Viewing in backend is here ==> ',
      body,
    );
  }
}
