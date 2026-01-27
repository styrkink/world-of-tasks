---
description: Run unit and integration tests
---

# Testing Workflow

## Frontend Tests

// turbo-all

1. Run all frontend tests:
```bash
docker-compose exec frontend npm test
```

2. Run tests in watch mode:
```bash
docker-compose exec frontend npm run test:watch
```

3. Run tests with coverage:
```bash
docker-compose exec frontend npm run test:coverage
```

## Backend Tests

1. Run all backend tests:
```bash
docker-compose exec backend npm test
```

2. Run e2e tests:
```bash
docker-compose exec backend npm run test:e2e
```

3. Run tests with coverage:
```bash
docker-compose exec backend npm run test:cov
```
