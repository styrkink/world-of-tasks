---
description: Database operations with Prisma (migrations, seed, reset)
---

# Database Workflow

## Prisma Migrations

// turbo-all

1. Create a new migration:
```bash
docker-compose exec backend npx prisma migrate dev --name <migration_name>
```

2. Apply migrations to production:
```bash
docker-compose exec backend npx prisma migrate deploy
```

3. Reset database (drops all data):
```bash
docker-compose exec backend npx prisma migrate reset
```

## Prisma Studio (Database GUI)

```bash
docker-compose exec backend npx prisma studio
```

Access at: http://localhost:5555

## Seed Database

```bash
docker-compose exec backend npx prisma db seed
```

## Generate Prisma Client

```bash
docker-compose exec backend npx prisma generate
```
