# Настройка аутентификации

## Структура проекта

### Конфигурация

- [.env](.env) - переменные окружения (не коммитится в git)
- [.env.example](.env.example) - пример файла с переменными окружения

### Типы

- [src/types/auth.ts](src/types/auth.ts) - TypeScript типы для аутентификации:
  - `User` - модель пользователя
  - `RegisterDTO` - данные для регистрации
  - `LoginDTO` - данные для логина
  - `AuthResponse` - ответ от API

### API клиент

- [src/api/auth.ts](src/api/auth.ts) - методы для работы с API аутентификации:
  - `authApi.register()` - регистрация пользователя
  - `authApi.login()` - вход пользователя

### Утилиты

- [src/utils/cookies.ts](src/utils/cookies.ts) - утилиты для работы с cookies:
  - `clearAllCookies()` - очистка всех cookies
  - `getCookie(name)` - получение cookie по имени
  - `setCookie(name, value, days)` - установка cookie
  - `deleteCookie(name)` - удаление конкретного cookie

### State Management (Zustand)

- [src/store/authStore.ts](src/store/authStore.ts) - глобальный store для аутентификации:
  - Состояние: `user`, `token`, `isLoading`, `error`
  - Действия: `register()`, `login()`, `logout()`, `clearError()`, `setUser()`
  - Автоматическое сохранение в localStorage через `persist` middleware

### Переиспользуемые компоненты

- [src/components/ui/FormInput/FormInput.tsx](src/components/ui/FormInput/FormInput.tsx) - поле ввода с label
- [src/components/ui/FormButton/FormButton.tsx](src/components/ui/FormButton/FormButton.tsx) - кнопка формы
- [src/components/ui/FormDivider/FormDivider.tsx](src/components/ui/FormDivider/FormDivider.tsx) - разделитель с текстом

### Защита маршрутов

- [src/components/auth/ProtectedRoute.tsx](src/components/auth/ProtectedRoute.tsx) - защита приватных маршрутов
  - Проверяет авторизацию пользователя
  - Перенаправляет на `/login` если не авторизован
  - Сохраняет путь для возврата после логина

- [src/components/auth/PublicRoute.tsx](src/components/auth/PublicRoute.tsx) - защита публичных маршрутов
  - Перенаправляет авторизованных пользователей на `/`
  - Предотвращает доступ к login/register для авторизованных

### Страницы

- [src/pages/register-page/RegisterPage.tsx](src/pages/register-page/RegisterPage.tsx) - страница регистрации
- [src/pages/login-page/LoginPage.tsx](src/pages/login-page/LoginPage.tsx) - страница входа

## Использование

### Настройка переменных окружения

Создайте файл `.env` в корне проекта:

```bash
VITE_API_BASE_URL=https://uniflow.sharshekeev13.dev
```

### Использование Zustand store в компонентах

```typescript
import { useAuthStore } from "@/store/authStore";
import { useNavigate } from "react-router";

function MyComponent() {
  const navigate = useNavigate();
  const { user, login, logout, isLoading, error } = useAuthStore();

  // Проверка авторизации
  if (!user) {
    return <div>Пожалуйста, войдите</div>;
  }

  const handleLogout = () => {
    logout(); // Очищает cookies, localStorage и Zustand state
    navigate("/login");
  };

  return (
    <div>
      <p>Привет, {user.fullName}!</p>
      <button onClick={handleLogout}>Выйти</button>
    </div>
  );
}
```

### Logout функциональность

При вызове `logout()`:
1. ✅ Очищаются **все cookies** (включая для всех доменов и субдоменов)
2. ✅ Очищается **localStorage** (user, token через persist middleware)
3. ✅ Сбрасывается **Zustand state** (user: null, token: null, error: null)
4. ✅ Пользователь перенаправляется на страницу `/login`

Кнопка Logout в Sidebar автоматически выполняет все эти шаги.

## Защита маршрутов

### Как это работает

Все маршруты в приложении защищены на уровне роутинга:

1. **Приватные маршруты** (требуют авторизации):
   - Обернуты в `<ProtectedRoute>`
   - Если пользователь НЕ авторизован → редирект на `/login`
   - После успешного логина → возврат на исходную страницу

2. **Публичные маршруты** (для неавторизованных):
   - Обернуты в `<PublicRoute>`
   - Если пользователь УЖЕ авторизован → редирект на `/`
   - Предотвращает повторный вход

### Пример потока авторизации

```
1. Пользователь заходит на /timetable (не авторизован)
   ↓
2. ProtectedRoute перехватывает и редиректит на /login
   ↓
3. Пользователь вводит данные и логинится
   ↓
4. Успешная авторизация → автоматический редирект на /timetable
```

### Добавление новых защищенных маршрутов

```typescript
// В router.tsx - внутри ProtectedRoute
{
  path: "new-page",
  element: <NewPage />
}
```

Все дочерние маршруты автоматически защищены, так как родительский элемент обернут в `ProtectedRoute`.

### API Endpoints

**Регистрация:**
```bash
POST /auth/register
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "SecurePass123",
  "fullName": "John Doe"
}
```

**Логин:**
```bash
POST /auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "SecurePass123"
}
```

## Преимущества использования Zustand

1. **Простота** - минимальный boilerplate код
2. **Производительность** - нет лишних ре-рендеров
3. **TypeScript** - полная поддержка типизации
4. **Persist** - автоматическое сохранение состояния в localStorage
5. **DevTools** - интеграция с Redux DevTools для отладки

## Безопасность

- ✅ `.env` файл добавлен в `.gitignore`
- ✅ Пароли не сохраняются в localStorage (только user и token)
- ✅ Валидация данных на клиенте перед отправкой
- ✅ Обработка ошибок API
