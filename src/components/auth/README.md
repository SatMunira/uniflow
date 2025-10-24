# Компоненты аутентификации

Этот каталог содержит компоненты для защиты маршрутов и управления доступом.

## ProtectedRoute [ProtectedRoute.tsx](./ProtectedRoute.tsx)

Защищает маршруты от неавторизованных пользователей.

### Функциональность

- ✅ Проверяет наличие пользователя в Zustand store
- ✅ Если пользователь **НЕ** авторизован → перенаправляет на `/login`
- ✅ Сохраняет путь, на который пользователь пытался попасть
- ✅ После успешного логина возвращает пользователя на исходную страницу

### Использование

```typescript
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";

// В router.tsx
{
  path: "/",
  element: (
    <ProtectedRoute>
      <AppShell />
    </ProtectedRoute>
  ),
  children: [
    // Все эти маршруты защищены
    { path: "timetable", element: <TimetablePage /> },
    { path: "board", element: <BoardPage /> },
    // ...
  ]
}
```

### Пример работы

1. Пользователь **НЕ** авторизован и пытается зайти на `/timetable`
2. `ProtectedRoute` перенаправляет на `/login` с сохранением пути: `state: { from: { pathname: "/timetable" } }`
3. Пользователь успешно логинится
4. Система автоматически перенаправляет на `/timetable`

## PublicRoute [PublicRoute.tsx](./PublicRoute.tsx)

Защищает публичные маршруты (login/register) от авторизованных пользователей.

### Функциональность

- ✅ Проверяет наличие пользователя в Zustand store
- ✅ Если пользователь **УЖЕ** авторизован → перенаправляет на `/`
- ✅ Предотвращает доступ авторизованных пользователей к страницам login/register

### Использование

```typescript
import { PublicRoute } from "@/components/auth/PublicRoute";

// В router.tsx
{
  path: "/login",
  element: (
    <PublicRoute>
      <LoginPage />
    </PublicRoute>
  ),
},
{
  path: "/register",
  element: (
    <PublicRoute>
      <RegisterPage />
    </PublicRoute>
  ),
}
```

### Пример работы

1. Пользователь **УЖЕ** авторизован и пытается зайти на `/login`
2. `PublicRoute` автоматически перенаправляет на `/`
3. Пользователь попадает на главную страницу

## Архитектура защиты маршрутов

```
┌─────────────────────────────────────────┐
│         Пользователь заходит            │
│         на любой маршрут                │
└──────────────┬──────────────────────────┘
               │
               ▼
     ┌──────────────────┐
     │ Проверка user в  │
     │  Zustand store   │
     └────┬────────┬────┘
          │        │
    user  │        │  no user
    ✓     │        │  ✗
          ▼        ▼
  ┌───────────┐  ┌──────────────┐
  │ Protected │  │    Public    │
  │   Routes  │  │    Routes    │
  │           │  │              │
  │ /timetable│  │   /login     │
  │ /board    │  │   /register  │
  │ /library  │  │              │
  │ ...       │  │              │
  └───────────┘  └──────────────┘
       │               │
       ▼               ▼
  Доступ           Доступ
  разрешен        разрешен
```

## Интеграция с Zustand

Оба компонента используют `useAuthStore` для проверки состояния аутентификации:

```typescript
const user = useAuthStore((state) => state.user);

if (!user) {
  // Пользователь не авторизован
}
```

## Безопасность

### ✅ Что защищено

- Все маршруты внутри `AppShell` требуют авторизации
- Доступ к `/login` и `/register` блокируется для авторизованных пользователей
- Автоматическое сохранение и восстановление пути после логина

### ⚠️ Важные замечания

1. **Client-side защита** - это первый уровень защиты
2. **Backend API** также должен проверять авторизацию для каждого запроса
3. Никогда не полагайтесь только на client-side защиту для критичных данных

## Flow диаграмма

### Неавторизованный пользователь пытается зайти на защищенную страницу:

```
User → /timetable → ProtectedRoute
                         ↓
                    user = null
                         ↓
                Navigate to /login
                    (save /timetable)
                         ↓
                    LoginPage
                         ↓
                User logs in successfully
                         ↓
                Navigate to /timetable ✓
```

### Авторизованный пользователь пытается зайти на /login:

```
User → /login → PublicRoute
                     ↓
                user = {...}
                     ↓
             Navigate to / ✓
```

## См. также

- [authStore.ts](../../store/authStore.ts) - Zustand store для аутентификации
- [router.tsx](../../app/router.tsx) - Конфигурация маршрутов с защитой
- [AUTH_SETUP.md](../../../AUTH_SETUP.md) - Полная документация по аутентификации
