import { Controller, Get } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('root')
@Controller()
export class AppController {
  @Get()
  @ApiOperation({ summary: 'Root endpoint - API info' })
  getRoot() {
    return {
      name: 'Project Nexus API',
      version: '1.0.0',
      status: 'running',
      endpoints: {
        health: '/api/health',
        docs: '/api/docs',
        auth: '/api/auth',
        users: '/api/users',
      },
      message: '✅ Backend is running successfully!',
    };
  }
}
