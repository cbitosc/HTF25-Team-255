import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { Logger } from '@nestjs/common';

@WebSocketGateway({
  cors: {
    origin: process.env.FRONTEND_URL || 'http://localhost:3000',
    credentials: true,
  },
})
export class WebsocketGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  private logger = new Logger(WebsocketGateway.name);

  handleConnection(client: Socket) {
    this.logger.log(`Client connected: ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    this.logger.log(`Client disconnected: ${client.id}`);
  }

  @SubscribeMessage('join:project')
  handleJoinProject(client: Socket, projectId: string) {
    client.join(`project:${projectId}`);
    this.logger.log(`Client ${client.id} joined project ${projectId}`);
  }

  @SubscribeMessage('leave:project')
  handleLeaveProject(client: Socket, projectId: string) {
    client.leave(`project:${projectId}`);
    this.logger.log(`Client ${client.id} left project ${projectId}`);
  }

  // Broadcast methods
  broadcastTaskUpdate(projectId: string, task: any) {
    this.server.to(`project:${projectId}`).emit('task:updated', task);
  }

  broadcastTaskCreated(projectId: string, task: any) {
    this.server.to(`project:${projectId}`).emit('task:created', task);
  }

  broadcastTaskDeleted(projectId: string, taskId: string) {
    this.server.to(`project:${projectId}`).emit('task:deleted', { taskId });
  }

  broadcastCommentAdded(projectId: string, comment: any) {
    this.server.to(`project:${projectId}`).emit('comment:added', comment);
  }
}
