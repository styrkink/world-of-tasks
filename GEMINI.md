# World of Tasks

## Описание проекта

**World of Tasks** — веб-приложение для борьбы с прокрастинацией через AI-декомпозицию целей и геймификацию в стиле WoW TBC. Пользователь создаёт персонажа, ведёт кампании (проекты), выполняет квесты с чеклистами, получает XP/Gold, покупает "хотелки".

## Архитектура

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│    Frontend     │    │     Backend     │    │    Database     │
│   (Next.js)     │◄──►│    (NestJS)     │◄──►│  (PostgreSQL)   │
│   Port: 3000    │    │   Port: 4000    │    │   Port: 5432    │
└─────────────────┘    └─────────────────┘    └─────────────────┘
        │                      │
        └──────────────────────┴─── Docker Compose ───
```

### Технологии

| Layer | Stack |
|-------|-------|
| Frontend | Next.js 14+, TypeScript, CSS Modules |
| Backend | NestJS, TypeScript, Prisma |
| Database | PostgreSQL 15+ |
| Auth | JWT (backend) + NextAuth (frontend) |
| AI | Adapter pattern (provider TBD) |
| DevOps | Docker, Docker Compose |

## Структура проекта

```
World of tasks/
├── frontend/              # Next.js приложение
│   ├── src/
│   │   ├── app/           # App Router pages
│   │   ├── components/    # React компоненты
│   │   ├── lib/           # Utilities, API client
│   │   └── styles/        # CSS modules
│   └── Dockerfile
│
├── backend/               # NestJS API
│   ├── src/
│   │   ├── modules/       # Feature modules
│   │   ├── common/        # Shared code
│   │   └── prisma/        # Prisma schema & migrations
│   └── Dockerfile
│
├── docker-compose.yml     # Оркестрация сервисов
├── .env.example           # Шаблон переменных окружения
└── GEMINI.md              # Этот файл
```

## Команды разработки

```bash
# Запуск всех сервисов
docker-compose up -d

# Логи
docker-compose logs -f [frontend|backend|db]

# Миграции БД
docker-compose exec backend npx prisma migrate dev

# Остановка
docker-compose down
```

## Coding Conventions

### TypeScript
- Strict mode включён
- Explicit types для public API
- Interfaces для объектов, types для unions

### Naming
- **Files**: kebab-case (`quest-service.ts`)
- **Components**: PascalCase (`QuestCard.tsx`)
- **Functions/Variables**: camelCase
- **Constants**: UPPER_SNAKE_CASE
- **Database tables**: snake_case

### Components (React)
```tsx
// Структура компонента
interface QuestCardProps {
  quest: Quest;
  onAccept: () => void;
}

export function QuestCard({ quest, onAccept }: QuestCardProps) {
  // hooks
  // handlers
  // render
}
```

### API (NestJS)
```typescript
// RESTful endpoints
GET    /api/campaigns
POST   /api/campaigns
GET    /api/campaigns/:id
PATCH  /api/campaigns/:id
DELETE /api/campaigns/:id  // soft delete (archive)
```

## Data Model (Key Entities)

- **User** — аккаунт
- **Character** — персонаж (faction, race, class, name, xp, level, gold)
- **Campaign** — проект/цель (active/archived)
- **QuestChain** — глава/chapter
- **Quest** — квест (status, is_milestone, xp_reward)
- **QuestStep** — шаг чеклиста
- **WishItem** — хотелка (cost_gold)
- **Transaction** — лог XP/Gold изменений

## AI Integration

AI используется для генерации квестлайнов по описанию цели и страхов.

### Input
```json
{
  "goal": "Learn TypeScript",
  "fears": ["Too complex", "No time"],
  "deadline": "2024-03-01",
  "hours_per_week": 10
}
```

### Output Schema
- Quest chains с prerequisites
- Quests со steps (3-7)
- Milestone flags
- Estimated minutes per quest

### Guardrails
- Quests: 8-25 per campaign
- Steps: 3-7 per quest
- Completed quests = immutable

## Design Style

**WoW: The Burning Crusade** — квест-лог эстетика:
- Пергаментные текстуры
- Золотые бордюры
- Готический шрифт для заголовков
- Зелёный (available), жёлтый (in_progress), золотой (completed)
- Fantasy UI элементы

Assets генерируются через AI (generate_image tool).
