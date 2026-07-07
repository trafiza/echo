import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';

import { Server, Socket } from 'socket.io';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class MessagesGateway
  implements OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer()
  server: Server;

  handleConnection(client: Socket) {
    console.log(`🔌 Cliente ligado: ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    console.log(`❌ Cliente saiu: ${client.id}`);
  }

  @SubscribeMessage('join-channel')
  handleJoin(
    @MessageBody() channelId: string,
    @ConnectedSocket() client: Socket,
  ) {
    client.join(channelId);

    console.log(`${client.id} entrou em ${channelId}`);

    client.emit('joined-channel', channelId);
  }

  @SubscribeMessage('leave-channel')
  handleLeave(
    @MessageBody() channelId: string,
    @ConnectedSocket() client: Socket,
  ) {
    client.leave(channelId);

    console.log(`${client.id} saiu de ${channelId}`);
  }

  sendMessage(channelId: string, message: any) {
    this.server.to(channelId).emit('message:new', message);
  }
}