# Project Nexus - Architecture Documentation

## Overview
Project Nexus is a production-ready, multi-tenant SaaS platform for collaborative workspace management, built with scalability, security, and maintainability as core principles.

## Tech Stack

### Frontend
- **Framework**: Next.js 14+ (App Router) with TypeScript
- **Styling**: Tailwind CSS
- **State Management**: Zustand + React Query (TanStack Query)
- **Real-time**: Socket.io Client
- **UI Components**: shadcn/ui (Radix UI primitives)
- **Forms**: React Hook Form + Zod validation
- **Drag & Drop**: @dnd-kit/core
- **Calendar**: FullCalendar
- **Charts**: Recharts

### Backend
- **Framework**: NestJS with TypeScript
- **Database**: PostgreSQL 15+
- **ORM**: Prisma
- **Cache/Queue**: Redis
- **Real-time**: Socket.io (NestJS WebSockets Gateway)
- **Authentication**: JWT (access + refresh tokens)
- **OAuth**: Passport.js (Google, GitHub)
- **API Documentation**: Swagger (OpenAPI 3.0)
- **Validation**: class-validator + class-transformer
- **Security**: Helmet, CORS, Rate Limiting (throttler)

### DevOps
- **Containerization**: Docker + Docker Compose
- **CI/CD**: GitHub Actions
- **Testing**: Jest (Unit), Supertest (Integration), Playwright (E2E)

## High-Level Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                         Frontend                             │
│  Next.js App (Port 3000)                                    │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐                 │
│  │   Auth   │  │  Boards  │  │ Calendar │                 │
│  │  Pages   │  │   UI     │  │   UI     │                 │
│  └──────────┘  └──────────┘  └──────────┘                 │
│         │             │              │                      │
│         └─────────────┴──────────────┘                      │
│                       │                                      │
└───────────────────────┼──────────────────────────────────────┘
                        │
                        │ HTTP/REST + WebSocket
                        │
┌───────────────────────┼──────────────────────────────────────┐
│                       ▼                                       │
│               NestJS Backend (Port 4000)                     │
│  ┌─────────────────────────────────────────────────────┐   │
│  │              API Gateway / Controllers               │   │
│  └─────────────────────────────────────────────────────┘   │
│                           │                                  │
│  ┌────────────┬───────────┼───────────┬──────────────┐     │
│  │            │            │           │              │     │
│  ▼            ▼            ▼           ▼              ▼     │
│ ┌──────┐  ┌──────┐  ┌─────────┐  ┌────────┐  ┌──────────┐ │
│ │ Auth │  │ Work │  │ Project │  │  Task  │  │Calendar  │ │
│ │Module│  │space │  │ Module  │  │ Module │  │ Module   │ │
│ └──────┘  └──────┘  └─────────┘  └────────┘  └──────────┘ │
│                                                               │
│ ┌──────────┐  ┌────────────┐  ┌─────────────┐             │
│ │   Git    │  │  Reports   │  │   Review    │             │
│ │Integration│  │  Module    │  │   Module    │             │
│ └──────────┘  └────────────┘  └─────────────┘             │
│                           │                                  │
│  ┌────────────────────────┼─────────────────────────────┐  │
│  │         WebSocket Gateway (Socket.io)                 │  │
│  └────────────────────────┼─────────────────────────────┘  │
└───────────────────────────┼──────────────────────────────────┘
                            │
        ┌───────────────────┼───────────────────┐
        │                   │                   │
        ▼                   ▼                   ▼
┌──────────────┐    ┌──────────────┐    ┌─────────────┐
│ PostgreSQL   │    │    Redis     │    │  External   │
│   Database   │    │ Cache/Queue  │    │    APIs     │
│              │    │ WebSocket    │    │ - Google    │
│ Port: 5432   │    │ Port: 6379   │    │ - GitHub    │
└──────────────┘    └──────────────┘    │ - Outlook   │
                                         └─────────────┘
```

## Module Structure (Modular Monolith)

### Core Modules

1. **AuthModule**
   - User registration/login
   - JWT token management (access + refresh)
   - OAuth2 flows (Google, GitHub)
   - Password reset

2. **UsersModule**
   - User profile management
   - User settings

3. **WorkspacesModule**
   - Multi-tenant workspace management
   - Workspace creation/deletion
   - User-Workspace relationships
   - RBAC implementation

4. **ProjectsModule**
   - Project CRUD operations
   - Project members management

5. **TasksModule**
   - Task CRUD with full metadata
   - Task board management
   - Drag-drop status updates
   - Comments thread
   - Checklists

6. **CalendarModule**
   - Internal calendar events
   - Google Calendar integration
   - Outlook Calendar integration
   - Two-way sync logic

7. **ReportsModule**
   - Dashboard analytics
   - Burndown charts
   - Weekly report generation (cron)
   - PDF generation
   - Email service

8. **IntegrationsModule**
   - GitHub webhook handlers
   - GitHub API client
   - Google Workspace API client
   - PR/Issue linking

9. **ReviewModule**
   - Mentor feedback
   - Peer review workflow

10. **NotificationsModule**
    - Real-time notifications
    - Email notifications

11. **WebSocketModule**
    - Real-time event broadcasting
    - Room management (per project)

## Database Schema Design

See `backend/prisma/schema.prisma` for complete schema.

### Key Entities

- **User**: Core user entity
- **Workspace**: Tenant isolation
- **WorkspaceMember**: User-Workspace relationship with roles
- **Project**: Container for tasks and boards
- **ProjectMember**: User-Project relationship
- **Task**: Task cards with all metadata
- **TaskComment**: Comment thread on tasks
- **TaskChecklist**: Checklist items within tasks
- **CalendarEvent**: Internal calendar events
- **Meeting**: Meeting events with calendar sync
- **Report**: Generated reports
- **GitHubIntegration**: GitHub link metadata
- **Review**: Peer review entries
- **Feedback**: Mentor feedback

## API Design

### REST API Structure

Base URL: `/api/v1`

#### Authentication
- `POST /auth/register` - User registration
- `POST /auth/login` - User login
- `POST /auth/logout` - User logout
- `POST /auth/refresh` - Refresh access token
- `GET /auth/google` - Google OAuth redirect
- `GET /auth/google/callback` - Google OAuth callback
- `GET /auth/github` - GitHub OAuth redirect
- `GET /auth/github/callback` - GitHub OAuth callback

#### Workspaces
- `GET /workspaces` - List user's workspaces
- `POST /workspaces` - Create workspace
- `GET /workspaces/:id` - Get workspace details
- `PATCH /workspaces/:id` - Update workspace
- `DELETE /workspaces/:id` - Delete workspace
- `POST /workspaces/:id/members` - Invite member
- `PATCH /workspaces/:id/members/:userId` - Update member role
- `DELETE /workspaces/:id/members/:userId` - Remove member

#### Projects
- `GET /workspaces/:workspaceId/projects` - List projects
- `POST /workspaces/:workspaceId/projects` - Create project
- `GET /projects/:id` - Get project details
- `PATCH /projects/:id` - Update project
- `DELETE /projects/:id` - Delete project
- `POST /projects/:id/members` - Add project member

#### Tasks
- `GET /projects/:projectId/tasks` - List tasks
- `POST /projects/:projectId/tasks` - Create task
- `GET /tasks/:id` - Get task details
- `PATCH /tasks/:id` - Update task
- `DELETE /tasks/:id` - Delete task
- `POST /tasks/:id/comments` - Add comment
- `POST /tasks/:id/checklists` - Add checklist item
- `PATCH /tasks/:id/checklists/:itemId` - Update checklist item

#### Calendar
- `GET /workspaces/:workspaceId/calendar` - Get calendar events
- `POST /workspaces/:workspaceId/meetings` - Create meeting
- `PATCH /meetings/:id` - Update meeting
- `DELETE /meetings/:id` - Delete meeting
- `POST /calendar/sync/google` - Sync Google Calendar
- `POST /calendar/sync/outlook` - Sync Outlook Calendar

#### Reports
- `GET /projects/:projectId/dashboard` - Get dashboard data
- `GET /projects/:projectId/reports` - List reports
- `POST /projects/:projectId/reports/generate` - Generate report

#### Integrations
- `POST /integrations/github/connect` - Connect GitHub
- `POST /tasks/:id/github/link` - Link PR/Issue to task
- `POST /integrations/github/webhooks` - GitHub webhook endpoint

#### Reviews
- `POST /tasks/:id/reviews/request` - Request review
- `POST /tasks/:id/reviews` - Submit review
- `POST /tasks/:id/feedback` - Add mentor feedback

### WebSocket Events

#### Client → Server
- `join:project` - Join project room
- `leave:project` - Leave project room
- `task:update` - Update task (triggers broadcast)

#### Server → Client
- `task:created` - Task created
- `task:updated` - Task updated
- `task:deleted` - Task deleted
- `task:moved` - Task moved on board
- `comment:added` - Comment added
- `member:joined` - Member joined project

## Security Architecture

### Authentication Flow
1. User provides credentials
2. Backend validates and generates JWT access token (15min expiry) + refresh token (7 days)
3. Tokens stored in HTTP-only, secure cookies
4. Access token used for API authentication
5. Refresh token used to obtain new access token

### Authorization
- Guard-based authorization in NestJS
- Role verification at workspace and project levels
- Resource ownership validation
- Permission matrix implementation

### Rate Limiting
- Redis-backed rate limiting
- Per-IP and per-user limits
- Different limits for authenticated vs. anonymous

### Data Protection
- Passwords hashed with Argon2
- SQL injection prevention via Prisma ORM
- XSS prevention via input sanitization
- CSRF protection via SameSite cookies

## Scalability Considerations

### Horizontal Scaling
- Stateless backend services
- Redis for session sharing
- WebSocket scaling via Redis Adapter

### Caching Strategy
- Redis caching for frequently accessed data
- Cache invalidation on mutations
- TTL-based expiration

### Database Optimization
- Proper indexing on foreign keys
- Composite indexes for common queries
- Connection pooling

## Development Workflow

1. **Local Development**: Docker Compose stack
2. **Testing**: Run Jest tests before commits
3. **CI/CD**: GitHub Actions pipeline
   - Lint check
   - Type check
   - Unit tests
   - Integration tests
   - Build Docker images
4. **Deployment**: Container-based deployment

## Monitoring & Logging

- Structured logging with Winston
- Request/response logging
- Error tracking
- Performance metrics
- Health check endpoints

## Future Enhancements

- Microservices migration path defined
- Message queue (RabbitMQ/SQS) for async tasks
- Elasticsearch for advanced search
- Kubernetes deployment manifests
- Multi-region deployment
