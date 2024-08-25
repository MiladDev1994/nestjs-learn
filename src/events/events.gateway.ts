import { OnModuleInit } from '@nestjs/common';
import { MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from "socket.io"

@WebSocketGateway({
  cors: {
    origin: "*"
  }
})
export class EventsGateway implements OnModuleInit {
  @WebSocketServer()
  server: Server

  onModuleInit() {
    this.server.on("connection", (socket) => {
      console.log(socket.id);
      console.log(socket.connected);
    })
  }

  @SubscribeMessage('message')
  handleMessage(
    @MessageBody()
    data: any
  ) {
    console.log("get from client");
    console.log(data);
  }
}
