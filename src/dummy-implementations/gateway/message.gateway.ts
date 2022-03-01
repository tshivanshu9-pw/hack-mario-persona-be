import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'socket.io';

@WebSocketGateway()
export class MessageGateway {
  @WebSocketServer()
  server: Server;

  @SubscribeMessage('message')
  listenForMessages(@MessageBody() data: string) {
    //   To all
    this.server.send('receive_message', data);
    // return 'hello';
  }
}
