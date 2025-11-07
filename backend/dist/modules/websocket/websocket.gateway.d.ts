import { OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
export declare class WebsocketGateway implements OnGatewayConnection, OnGatewayDisconnect {
    server: Server;
    private logger;
    handleConnection(client: Socket): void;
    handleDisconnect(client: Socket): void;
    handleJoinProject(client: Socket, projectId: string): void;
    handleLeaveProject(client: Socket, projectId: string): void;
    broadcastTaskUpdate(projectId: string, task: any): void;
    broadcastTaskCreated(projectId: string, task: any): void;
    broadcastTaskDeleted(projectId: string, taskId: string): void;
    broadcastCommentAdded(projectId: string, comment: any): void;
}
