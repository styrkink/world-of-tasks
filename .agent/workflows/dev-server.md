---
description: Start all development services with Docker Compose
---

# Dev Server Workflow

## Start Development Environment

// turbo-all

1. Navigate to the project root and start all services:
```bash
docker-compose up -d
```

2. Check services are running:
```bash
docker-compose ps
```

3. View logs (optional):
```bash
docker-compose logs -f
```

## Access Points

| Service | URL |
|---------|-----|
| Frontend | http://localhost:3000 |
| Backend API | http://localhost:4000/api |
| Database | localhost:5432 |

## Stop Services

```bash
docker-compose down
```

## Rebuild After Changes

```bash
docker-compose up -d --build
```
