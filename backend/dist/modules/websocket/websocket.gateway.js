"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var WebsocketGateway_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.WebsocketGateway = void 0;
const websockets_1 = require("@nestjs/websockets");
const socket_io_1 = require("socket.io");
const common_1 = require("@nestjs/common");
let WebsocketGateway = WebsocketGateway_1 = class WebsocketGateway {
    constructor() {
        this.logger = new common_1.Logger(WebsocketGateway_1.name);
    }
    handleConnection(client) {
        this.logger.log(`Client connected: ${client.id}`);
    }
    handleDisconnect(client) {
        this.logger.log(`Client disconnected: ${client.id}`);
    }
    handleJoinProject(client, projectId) {
        client.join(`project:${projectId}`);
        this.logger.log(`Client ${client.id} joined project ${projectId}`);
    }
    handleLeaveProject(client, projectId) {
        client.leave(`project:${projectId}`);
        this.logger.log(`Client ${client.id} left project ${projectId}`);
    }
    broadcastTaskUpdate(projectId, task) {
        this.server.to(`project:${projectId}`).emit('task:updated', task);
    }
    broadcastTaskCreated(projectId, task) {
        this.server.to(`project:${projectId}`).emit('task:created', task);
    }
    broadcastTaskDeleted(projectId, taskId) {
        this.server.to(`project:${projectId}`).emit('task:deleted', { taskId });
    }
    broadcastCommentAdded(projectId, comment) {
        this.server.to(`project:${projectId}`).emit('comment:added', comment);
    }
};
exports.WebsocketGateway = WebsocketGateway;
__decorate([
    (0, websockets_1.WebSocketServer)(),
    __metadata("design:type", socket_io_1.Server)
], WebsocketGateway.prototype, "server", void 0);
__decorate([
    (0, websockets_1.SubscribeMessage)('join:project'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket, String]),
    __metadata("design:returntype", void 0)
], WebsocketGateway.prototype, "handleJoinProject", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('leave:project'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket, String]),
    __metadata("design:returntype", void 0)
], WebsocketGateway.prototype, "handleLeaveProject", null);
exports.WebsocketGateway = WebsocketGateway = WebsocketGateway_1 = __decorate([
    (0, websockets_1.WebSocketGateway)({
        cors: {
            origin: process.env.FRONTEND_URL || 'http://localhost:3000',
            credentials: true,
        },
    })
], WebsocketGateway);
//# sourceMappingURL=websocket.gateway.js.map