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
var RedisService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.RedisService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const ioredis_1 = require("ioredis");
let RedisService = RedisService_1 = class RedisService {
    constructor(configService) {
        this.configService = configService;
        this.logger = new common_1.Logger(RedisService_1.name);
        const redisConfig = {
            host: this.configService.get('REDIS_HOST', 'localhost'),
            port: this.configService.get('REDIS_PORT', 6379),
            password: this.configService.get('REDIS_PASSWORD'),
            retryStrategy: (times) => {
                const delay = Math.min(times * 50, 2000);
                return delay;
            },
        };
        this.client = new ioredis_1.default(redisConfig);
        this.subscriber = new ioredis_1.default(redisConfig);
        this.publisher = new ioredis_1.default(redisConfig);
        this.client.on('connect', () => {
            this.logger.log('✅ Redis connected successfully');
        });
        this.client.on('error', (error) => {
            this.logger.error('❌ Redis connection error:', error);
        });
    }
    async onModuleDestroy() {
        await this.client.quit();
        await this.subscriber.quit();
        await this.publisher.quit();
        this.logger.log('Redis disconnected');
    }
    async get(key) {
        return this.client.get(key);
    }
    async set(key, value, ttl) {
        if (ttl) {
            await this.client.setex(key, ttl, value);
        }
        else {
            await this.client.set(key, value);
        }
    }
    async del(key) {
        await this.client.del(key);
    }
    async exists(key) {
        const result = await this.client.exists(key);
        return result === 1;
    }
    async ping() {
        return this.client.ping();
    }
    async cacheGet(key) {
        const data = await this.get(key);
        return data ? JSON.parse(data) : null;
    }
    async cacheSet(key, value, ttl) {
        await this.set(key, JSON.stringify(value), ttl);
    }
    async cacheDel(key) {
        await this.del(key);
    }
    async publish(channel, message) {
        await this.publisher.publish(channel, message);
    }
    async subscribe(channel, handler) {
        await this.subscriber.subscribe(channel);
        this.subscriber.on('message', (ch, message) => {
            if (ch === channel) {
                handler(message);
            }
        });
    }
    async unsubscribe(channel) {
        await this.subscriber.unsubscribe(channel);
    }
    async checkRateLimit(key, limit, window) {
        const current = await this.client.incr(key);
        if (current === 1) {
            await this.client.expire(key, window);
        }
        return current <= limit;
    }
    async setSession(sessionId, data, ttl) {
        await this.cacheSet(`session:${sessionId}`, data, ttl);
    }
    async getSession(sessionId) {
        return this.cacheGet(`session:${sessionId}`);
    }
    async deleteSession(sessionId) {
        await this.cacheDel(`session:${sessionId}`);
    }
    getClient() {
        return this.client;
    }
    getSubscriber() {
        return this.subscriber;
    }
    getPublisher() {
        return this.publisher;
    }
};
exports.RedisService = RedisService;
exports.RedisService = RedisService = RedisService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], RedisService);
//# sourceMappingURL=redis.service.js.map