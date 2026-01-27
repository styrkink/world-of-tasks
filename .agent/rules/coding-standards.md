---
description: Coding standards and conventions for World of Tasks
---

# Coding Standards

## TypeScript

- **Strict mode** enabled in all projects
- **Explicit types** for public APIs (function params, return types)
- **Interfaces** for object shapes, **types** for unions/primitives
- **No `any`** — use `unknown` if type is unclear

## Naming Conventions

| Element | Convention | Example |
|---------|------------|---------|
| Files | kebab-case | `quest-service.ts` |
| Components | PascalCase | `QuestCard.tsx` |
| Functions | camelCase | `handleQuestAccept` |
| Variables | camelCase | `questList` |
| Constants | UPPER_SNAKE_CASE | `MAX_QUEST_STEPS` |
| Database | snake_case | `quest_steps` |
| Types/Interfaces | PascalCase | `QuestStatus` |

## React Components

```tsx
interface QuestCardProps {
  quest: Quest;
  onAccept: () => void;
}

export function QuestCard({ quest, onAccept }: QuestCardProps) {
  // 1. Hooks first
  const [isLoading, setIsLoading] = useState(false);
  
  // 2. Handlers
  const handleClick = () => { ... };
  
  // 3. Render
  return <div>...</div>;
}
```

## NestJS Modules

```typescript
// Controller: thin, delegates to service
@Controller('quests')
export class QuestsController {
  constructor(private readonly questsService: QuestsService) {}
  
  @Get()
  findAll() {
    return this.questsService.findAll();
  }
}

// Service: business logic
@Injectable()
export class QuestsService {
  constructor(private readonly prisma: PrismaService) {}
}
```

## Error Handling

- Frontend: try/catch + toast notifications
- Backend: NestJS exception filters
- Always log errors with context

## Git Commits

Format: `type(scope): message`

Types: `feat`, `fix`, `refactor`, `docs`, `test`, `chore`

Example: `feat(quests): add turn-in validation`
