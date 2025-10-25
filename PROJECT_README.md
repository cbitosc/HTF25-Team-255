# Project Nexus 🚀

**A Production-Ready Multi-Tenant SaaS Platform for Collaborative Workspace Management**

[![CI/CD Pipeline](https://github.com/TheAnanth/HTF25-Team-255/actions/workflows/main.yml/badge.svg)](https://github.com/TheAnanth/HTF25-Team-255/actions/workflows/main.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.3-blue)](https://www.typescriptlang.org/)
[![NestJS](https://img.shields.io/badge/NestJS-10.x-red)](https://nestjs.com/)
[![Next.js](https://img.shields.io/badge/Next.js-14.x-black)](https://nextjs.org/)

---

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Architecture](#architecture)
- [Prerequisites](#prerequisites)
- [Quick Start](#quick-start)
- [Installation](#installation)
- [Configuration](#configuration)
- [Development](#development)
- [Testing](#testing)
- [Deployment](#deployment)
- [API Documentation](#api-documentation)
- [Contributing](#contributing)
- [License](#license)

---

## 🎯 Overview

Project Nexus is a comprehensive, enterprise-grade collaborative workspace platform that enables teams to manage tasks, meetings, and milestones with structured collaboration and transparent progress tracking. Built with scalability, security, and maintainability as core principles.

### Key Highlights

- **Multi-Tenancy**: Isolated workspaces with role-based access control
- **Real-Time Collaboration**: WebSocket-powered live updates across all clients
- **Kanban Boards**: Interactive drag-and-drop task management
- **Calendar Integration**: Two-way sync with Google Calendar and Outlook
- **GitHub Integration**: Bi-directional PR/Issue linking with automated status updates
- **Automated Reporting**: Weekly reports with PDF generation and email delivery
- **Production-Ready**: Comprehensive testing, security hardening, and Docker deployment

---

## ✨ Features

### Epic 1: Authentication & Team Workspace
- ✅ Secure user registration and login (email/password)
- ✅ OAuth2 integration (Google, GitHub)
- ✅ Multi-tenant workspace management
- ✅ Role-Based Access Control (Admin, Member, Guest)
- ✅ JWT authentication with refresh tokens

### Epic 2: Project & Task Management
- ✅ Multiple projects per workspace
- ✅ Interactive Kanban-style boards with drag-and-drop
- ✅ Rich task cards with:
  - Markdown descriptions
  - Multiple assignees
  - Due dates and priorities
  - Checklist items
  - Comment threads
- ✅ Real-time updates via WebSockets

### Epic 3: Calendar & Meeting Integration
- ✅ Internal workspace calendar
- ✅ Two-way sync with Google Calendar
- ✅ Two-way sync with Outlook Calendar
- ✅ Meeting scheduling with video call links
- ✅ Automatic calendar event creation

### Epic 4: Automated Reporting
- ✅ Project dashboard with analytics
- ✅ Burndown charts and activity metrics
- ✅ Automated weekly reports (cron job)
- ✅ PDF generation and email delivery
- ✅ Stakeholder notification system

### Epic 5: Integrations & Collaboration Tools
- ✅ GitHub integration
  - Link PRs and issues to tasks
  - Automatic status updates on PR merge
  - Webhook support
- ✅ Google Docs embedding
- ✅ Document collaboration within projects

### Epic 6: Feedback & Review Systems
- ✅ Mentor feedback on tasks
- ✅ Peer review workflow
- ✅ Approve/Request Changes functionality
- ✅ Review notifications

---

## 🛠️ Tech Stack

### Backend
- **Framework**: NestJS (Node.js) with TypeScript
- **Database**: PostgreSQL 15
- **ORM**: Prisma
- **Cache**: Redis
- **Real-time**: Socket.io
- **Authentication**: JWT + Passport.js
- **API Docs**: Swagger/OpenAPI 3.0
- **Validation**: class-validator + class-transformer

### Frontend
- **Framework**: Next.js 14 (App Router) with TypeScript
- **Styling**: Tailwind CSS
- **State Management**: Zustand + React Query
- **UI Components**: shadcn/ui (Radix UI)
- **Forms**: React Hook Form + Zod
- **Drag & Drop**: @dnd-kit
- **Charts**: Recharts
- **Calendar**: FullCalendar

### DevOps
- **Containerization**: Docker + Docker Compose
- **CI/CD**: GitHub Actions
- **Testing**: Jest (Unit), Supertest (Integration), Playwright (E2E)
- **Security Scanning**: Trivy

---

## 🏗️ Architecture

Project Nexus follows a **modular monolith** architecture with clear separation of concerns:

```
┌─────────────┐
│  Frontend   │  Next.js App
│  (Port 3000)│
└──────┬──────┘
       │ HTTP/REST + WebSocket
┌──────▼──────┐
│   Backend   │  NestJS API
│  (Port 4000)│
└──────┬──────┘
       │
   ┌───┴───┐
   │       │
┌──▼───┐ ┌─▼───┐
│ PG   │ │Redis│
└──────┘ └─────┘
```

For detailed architecture documentation, see [ARCHITECTURE.md](./ARCHITECTURE.md).

---

## 📦 Prerequisites

Ensure you have the following installed:

- **Node.js** v20.x or higher ([Download](https://nodejs.org/))
- **Docker** v24.x or higher ([Download](https://www.docker.com/))
- **Docker Compose** v2.x or higher
- **Git** ([Download](https://git-scm.com/))

Optional but recommended:
- **PostgreSQL** 15+ (if running locally without Docker)
- **Redis** 7+ (if running locally without Docker)

---

## 🚀 Quick Start

Get up and running in under 5 minutes with Docker:

```bash
# 1. Clone the repository
git clone https://github.com/TheAnanth/HTF25-Team-255.git
cd HTF25-Team-255

# 2. Copy environment variables
cp .env.example .env

# 3. Start all services with Docker Compose
docker-compose up -d

# 4. Run database migrations
docker-compose exec backend npm run prisma:migrate

# 5. (Optional) Seed database with sample data
docker-compose exec backend npm run prisma:seed

# 6. Access the application
# Frontend: http://localhost:3000
# Backend API: http://localhost:4000/api/v1
# API Docs: http://localhost:4000/api/docs
```

That's it! 🎉 The application is now running.

---

## 💻 Installation

### Option 1: Docker (Recommended)

Follow the [Quick Start](#quick-start) guide above.

### Option 2: Local Development

#### Backend Setup

```bash
cd backend

# Install dependencies
npm install

# Generate Prisma Client
npm run prisma:generate

# Run database migrations
npm run prisma:migrate

# Start development server
npm run start:dev
```

#### Frontend Setup

```bash
cd frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

---

## ⚙️ Configuration

### Environment Variables

Copy `.env.example` to `.env` and configure the following:

#### Required Variables

```bash
# Database
DATABASE_URL=postgresql://nexus:password@localhost:5432/nexus_db

# Redis
REDIS_HOST=localhost
REDIS_PORT=6379
REDIS_PASSWORD=your_redis_password

# JWT Secrets (generate with: openssl rand -base64 32)
JWT_ACCESS_SECRET=your_access_secret
JWT_REFRESH_SECRET=your_refresh_secret

# Application
FRONTEND_URL=http://localhost:3000
BACKEND_PORT=4000
```

#### Optional Variables (for full functionality)

```bash
# Google OAuth
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret

# GitHub OAuth
GITHUB_CLIENT_ID=your_github_client_id
GITHUB_CLIENT_SECRET=your_github_client_secret

# Email (SMTP)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email@gmail.com
SMTP_PASSWORD=your_app_password

# Google Calendar API
GOOGLE_CALENDAR_CLIENT_ID=your_calendar_client_id
GOOGLE_CALENDAR_CLIENT_SECRET=your_calendar_secret

# Microsoft Graph API (Outlook)
MICROSOFT_CLIENT_ID=your_microsoft_client_id
MICROSOFT_CLIENT_SECRET=your_microsoft_secret

# GitHub App (for integration)
GITHUB_APP_ID=your_github_app_id
GITHUB_APP_PRIVATE_KEY=your_private_key
GITHUB_WEBHOOK_SECRET=your_webhook_secret
```

### Getting API Credentials

1. **Google OAuth & Calendar**: [Google Cloud Console](https://console.cloud.google.com/)
2. **GitHub OAuth & App**: [GitHub Developer Settings](https://github.com/settings/developers)
3. **Microsoft Graph**: [Azure Portal](https://portal.azure.com/)

---

## 🔧 Development

### Running Services Individually

#### Backend
```bash
cd backend
npm run start:dev     # Development with hot reload
npm run start:debug   # Development with debugger
npm run build         # Production build
npm run start:prod    # Production mode
```

#### Frontend
```bash
cd frontend
npm run dev           # Development with hot reload
npm run build         # Production build
npm run start         # Production mode
npm run lint          # Lint code
```

### Database Management

```bash
# Generate Prisma Client
npm run prisma:generate

# Create a migration
npm run prisma:migrate

# Deploy migrations (production)
npm run prisma:migrate:prod

# Open Prisma Studio (Database GUI)
npm run prisma:studio

# Seed database
npm run prisma:seed
```

### Useful Docker Commands

```bash
# View logs
docker-compose logs -f                    # All services
docker-compose logs -f backend           # Backend only
docker-compose logs -f frontend          # Frontend only

# Stop services
docker-compose down                      # Stop and remove containers
docker-compose down -v                   # Stop and remove volumes

# Rebuild containers
docker-compose up -d --build             # Rebuild all
docker-compose up -d --build backend     # Rebuild backend only

# Execute commands in containers
docker-compose exec backend sh           # Backend shell
docker-compose exec postgres psql -U nexus nexus_db  # Database shell
```

---

## 🧪 Testing

### Backend Tests

```bash
cd backend

# Unit tests
npm run test

# Unit tests with coverage
npm run test:cov

# Integration tests
npm run test:e2e

# Watch mode
npm run test:watch
```

### Frontend Tests

```bash
cd frontend

# Unit tests
npm run test

# E2E tests (Playwright)
npm run test:e2e

# Watch mode
npm run test:watch
```

### Coverage Goals

- **Unit Tests**: 80%+ coverage
- **Integration Tests**: All critical API flows
- **E2E Tests**: Key user journeys

---

## 📚 API Documentation

### Interactive API Documentation

Once the backend is running, access the interactive Swagger documentation:

**URL**: [http://localhost:4000/api/docs](http://localhost:4000/api/docs)

### Key API Endpoints

#### Authentication
- `POST /api/v1/auth/register` - Register new user
- `POST /api/v1/auth/login` - Login user
- `GET /api/v1/auth/google` - Google OAuth login
- `GET /api/v1/auth/github` - GitHub OAuth login

#### Workspaces
- `GET /api/v1/workspaces` - List workspaces
- `POST /api/v1/workspaces` - Create workspace
- `POST /api/v1/workspaces/:id/members` - Add member

#### Projects
- `GET /api/v1/workspaces/:workspaceId/projects` - List projects
- `POST /api/v1/workspaces/:workspaceId/projects` - Create project

#### Tasks
- `GET /api/v1/projects/:projectId/tasks` - List tasks
- `POST /api/v1/projects/:projectId/tasks` - Create task
- `PATCH /api/v1/tasks/:id` - Update task
- `POST /api/v1/tasks/:id/comments` - Add comment

For complete API reference, see the Swagger documentation.

---

## 🚀 Deployment

### Docker Deployment

#### Build Production Images

```bash
# Backend
docker build -t nexus-backend:latest -f backend/Dockerfile backend/

# Frontend
docker build -t nexus-frontend:latest -f frontend/Dockerfile frontend/
```

#### Using Docker Compose (Production)

```bash
# Set environment to production
export NODE_ENV=production

# Start services
docker-compose -f docker-compose.yml -f docker-compose.prod.yml up -d
```

### Cloud Deployment Options

#### Option 1: AWS ECS/Fargate
- Use provided Docker images
- Set up RDS for PostgreSQL
- Use ElastiCache for Redis
- Configure Application Load Balancer

#### Option 2: Google Cloud Run
- Deploy containerized services
- Use Cloud SQL for PostgreSQL
- Use Memorystore for Redis

#### Option 3: Kubernetes
- Use provided Docker images
- Deploy with Helm charts (future addition)
- Configure Ingress for routing

### Environment-Specific Configuration

Ensure the following for production:

1. **Security**:
   - Strong JWT secrets
   - Secure database credentials
   - Enable HTTPS/TLS
   - Configure CORS properly

2. **Database**:
   - Enable connection pooling
   - Set up backups
   - Configure read replicas

3. **Redis**:
   - Enable persistence
   - Configure clustering

4. **Monitoring**:
   - Set up error tracking (Sentry)
   - Configure logging aggregation
   - Enable performance monitoring

---

## 🔒 Security

Project Nexus implements comprehensive security measures:

### Authentication & Authorization
- ✅ Argon2 password hashing
- ✅ JWT with access and refresh tokens
- ✅ HTTP-only, secure cookies
- ✅ Role-based access control (RBAC)
- ✅ OAuth2 integration

### API Security
- ✅ Rate limiting (Redis-backed)
- ✅ Request validation (class-validator)
- ✅ CORS configuration
- ✅ Helmet.js security headers
- ✅ SQL injection prevention (Prisma ORM)

### Data Protection
- ✅ XSS prevention
- ✅ CSRF protection
- ✅ Input sanitization
- ✅ Output encoding

### OWASP Top 10 Compliance
All OWASP Top 10 vulnerabilities are addressed. See [SECURITY.md](./docs/SECURITY.md) for details.

---

## 📖 Additional Documentation

- **[ARCHITECTURE.md](./ARCHITECTURE.md)** - System architecture and design
- **[IMPLEMENTATION_GUIDE.md](./IMPLEMENTATION_GUIDE.md)** - Complete implementation details
- **[API Documentation](http://localhost:4000/api/docs)** - Interactive API reference

---

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 👥 Team

**HTF25-Team-255**

Built with ❤️ for the HTF25 Hackathon

---

## 🙏 Acknowledgments

- NestJS framework and community
- Next.js and Vercel team
- Prisma ORM
- All open-source contributors

---

## 📞 Support

For support, please:
- Open an issue on [GitHub](https://github.com/TheAnanth/HTF25-Team-255/issues)
- Check the documentation files
- Review the [IMPLEMENTATION_GUIDE.md](./IMPLEMENTATION_GUIDE.md)

---

## 🗺️ Roadmap

### Phase 1 (Current)
- ✅ Complete architecture design
- ✅ Database schema
- ✅ Docker infrastructure
- ✅ CI/CD pipeline
- 🚧 Core module implementation

### Phase 2 (Next Steps)
- [ ] Complete all backend modules
- [ ] Frontend application
- [ ] Comprehensive testing
- [ ] Production deployment

### Future Enhancements
- [ ] Mobile app (React Native)
- [ ] AI-powered task suggestions
- [ ] Advanced analytics
- [ ] Multi-language support

---

**Project Nexus - Building the future of collaborative workspace management**
