import { OnModuleInit } from '@nestjs/common';
import { MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer, WsResponse } from '@nestjs/websockets';
import { Observable, of } from 'rxjs';
import { Server } from "socket.io"

@WebSocketGateway({
  cors: {
    origin: ["http://localhost:3051", "http://192.168.1.8:3051"],
    methods: ["GET", "POST"],
    credentials: true
  }
})
export class EventsGateway implements OnModuleInit {
  @WebSocketServer()
  server: Server

  onModuleInit() {
    this.server.on("connection", (socket) => {
      // console.log(socket.id);
      // console.log(socket.connected);
    })
  }
  
  @SubscribeMessage('message')
  handleMessage(
    @MessageBody()
    data: any
  ): Observable<WsResponse<any>> {
    console.log(data);
    this.server.emit("response", data)
    return of({ event: "message", data})
  }
}
