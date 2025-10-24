# Утилиты проекта

## Cookies [cookies.ts](./cookies.ts)

Набор утилит для работы с browser cookies.

### clearAllCookies()

Удаляет все cookies из текущего домена, включая:
- Текущий путь
- Корневой домен
- Родительский домен (для субдоменов)

```typescript
import { clearAllCookies } from "@/utils/cookies";

// Удалить все cookies
clearAllCookies();
```

**Использование:** Вызывается автоматически при logout в `authStore.logout()`.

### getCookie(name: string)

Получает значение cookie по имени.

```typescript
import { getCookie } from "@/utils/cookies";

const sessionId = getCookie("session_id");
if (sessionId) {
  console.log("Session ID:", sessionId);
}
```

**Возвращает:** `string | null`

### setCookie(name: string, value: string, days?: number)

Устанавливает cookie с опциональным временем жизни.

```typescript
import { setCookie } from "@/utils/cookies";

// Cookie без срока действия (сессионный)
setCookie("theme", "dark");

// Cookie на 7 дней
setCookie("remember_me", "true", 7);

// Cookie на 30 дней
setCookie("user_preferences", JSON.stringify({ lang: "en" }), 30);
```

**Параметры:**
- `name` - имя cookie
- `value` - значение cookie
- `days` (опционально) - количество дней до истечения срока действия

### deleteCookie(name: string)

Удаляет конкретный cookie по имени.

```typescript
import { deleteCookie } from "@/utils/cookies";

deleteCookie("session_id");
```

## Примеры использования

### Сохранение предпочтений пользователя

```typescript
import { setCookie, getCookie } from "@/utils/cookies";

// Сохранение темы
const saveTheme = (theme: "light" | "dark") => {
  setCookie("theme", theme, 365); // На год
};

// Загрузка темы
const loadTheme = (): "light" | "dark" => {
  const theme = getCookie("theme");
  return (theme as "light" | "dark") || "light";
};
```

### Управление сессией

```typescript
import { setCookie, getCookie, deleteCookie } from "@/utils/cookies";

// Создание сессии
const createSession = (sessionId: string) => {
  setCookie("session_id", sessionId, 1); // На 1 день
};

// Проверка сессии
const hasActiveSession = (): boolean => {
  return getCookie("session_id") !== null;
};

// Завершение сессии
const endSession = () => {
  deleteCookie("session_id");
};
```

## Безопасность

⚠️ **Важно:**
- Не храните в cookies чувствительные данные (пароли, токены API)
- Для критичных данных используйте HttpOnly cookies на стороне сервера
- Используйте Secure flag для HTTPS соединений
- Соблюдайте политику GDPR/CCPA при работе с cookies

## См. также

- [authStore.ts](../store/authStore.ts) - использует `clearAllCookies()` при logout
- [AUTH_SETUP.md](../../AUTH_SETUP.md) - документация по аутентификации
