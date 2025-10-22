# UniFlow

Комплексное приложение для управления учебным процессом студентов: расписание, дедлайны, проекты (Kanban), библиотека материалов, Pomodoro, флэш‑карточки.

---

## Содержание

- [Требования](#требования)
- [Быстрый старт](#быстрый-старт)
- [Скрипты npm](#скрипты-npm)
- [Технологический стек](#технологический-стек)
- [Структура проекта](#структура-проекта)
- [Настройка окружения](#настройка-окружения)
- [UI: Tailwind v4 + shadcn/ui](#ui-tailwind-v4--shadcnui)
- [Фичи и модули](#фичи-и-модули)
- [Код‑стайл и качество](#кодстайл-и-качество)
- [Частые проблемы](#частые-проблемы)

---

## Требования

- **Node.js ≥ 18.17** (рекомендуется LTS 20)
- **npm ≥ 9** или **pnpm/yarn**
- Браузер с поддержкой ES2022

---

## Быстрый старт

```bash
# 1) Установка зависимостей
npm install

# 2) Запуск дев‑сервера
npm run dev

# 3) Продакшен‑сборка
npm run build

# 4) Локальный предпросмотр сборки
npm run preview
```

> По умолчанию Vite поднимает dev‑сервер на `http://localhost:5173`.

---

## Скрипты npm

- `dev` — запуск Vite dev‑сервера.
- `build` — тип‑чек (tsc) + сборка Vite.
- `preview` — локальный сервер для предпросмотра собранного бандла.
- `lint` — запуск ESLint.
- `prepare` — инициализация husky (хуки гита) — при необходимости.

---

## Технологический стек

**Основы**

- React 19, Vite 7, TypeScript 5
- React Router 7
- Tailwind CSS **v4** + `@tailwindcss/vite`
- shadcn/ui (через CLI, компоненты в `src/components/ui`)

**Данные и офлайн**

- @tanstack/react-query — запросы/кэш/ретраи
- Dexie — IndexedDB (local‑first)
- Axios (если добавится; можно использовать fetch)

**Состояние и формы**

- Zustand — лёгкий глобальный UI‑стейт
- react-hook-form + zod — типобезопасные формы

**Даты/расписание**

- date-fns, date-fns‑tz — даты, таймзоны
- rrule — повторяющиеся события (чёт/нечёт и паттерны)

**UI‑утилиты и экосистема**

- lucide-react — иконки
- sonner — тосты
- cmdk — командная палитра (Cmd/Ctrl + K)
- react-resizable-panels — ресайз панелей
- @dnd-kit/core, @dnd-kit/sortable *(можно добавить)* — drag&drop для Канбана

**Контент**

- react-markdown, remark-gfm, rehype-raw — Markdown
- katex, rehype-katex — формулы
- pdfjs-dist — просмотр PDF

**Списки, таблицы, визуализация**

- @tanstack/react-table — таблицы
- @tanstack/virtual — виртуализация списков
- recharts — графики (Pomodoro/прогресс)

**Реал‑тайм**

- sockjs-client, @stomp/stompjs — STOMP/WebSocket под Spring Boot

**Файлы**

- xlsx — импорт/экспорт таблиц
- jszip — архивирование
- react-dropzone — drag&drop загрузка
- file-type — определение формата файлов

**Dev**

- ESLint, Prettier, Typescript ESLint, Husky, lint-staged
- vite-plugin-pwa *(можно включить позже)*

Полные версии библиотек смотрите в `package.json`.

---

## Структура проекта

```
uniflow/
├─ public/
├─ src/
│  ├─ app/              # App, роуты, провайдеры
│  ├─ components/
│  │  ├─ layout/        # Sidebar, Topbar
│  │  └─ ui/            # shadcn/ui компоненты
│  ├─ pages/            # экраны (Schedule, Projects, Tasks, ...)
│  ├─ entities/         # доменные типы (TS)
│  ├─ data/             # db.ts (Dexie), repositories/
│  ├─ store/            # Zustand
│  ├─ styles/           # index.css (Tailwind v4)
│  ├─ utils/            # хэлперы
│  └─ main.tsx
├─ index.html
├─ package.json
├─ tsconfig.json
├─ vite.config.ts
└─ ...
```

---

## Настройка окружения

### Алиас импортов `@` → `src`

`tsconfig.json`:

```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": { "@/*": ["./src/*"] }
  }
}
```

`vite.config.ts`:

```ts
import path from 'path'
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: { alias: { '@': path.resolve(__dirname, 'src') } }
})
```

### Tailwind v4

`src/styles/index.css` — минимум:

```css
@import "tailwindcss";
@import "tw-animate-css"; /* анимации для shadcn */
```

### Тёмная тема (пример)

В `index.css` можно объявить переменные тем:

```css
:root { /* светлая палитра через CSS‑переменные */ }
.dark { /* тёмная палитра */ }
```

Переключатель темы — через добавление/удаление класса `dark` на `html`/`body` или через `data-theme`.

---

## UI: Tailwind v4 + shadcn/ui

### Установка shadcn/ui

```bash
npx shadcn@latest init
# затем добавляйте компоненты по имени
npx shadcn@latest add button card input dialog textarea select
```

Компоненты появятся в `src/components/ui/*`.

### Использование

```tsx
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export function Example(){
  return (
    <Card className="max-w-sm">
      <CardContent>
        <Button>Пример</Button>
      </CardContent>
    </Card>
  );
}
```

---

## Фичи и модули

- **Расписание**: импорт из PDF (ручная разметка → авто‑парсинг позже), чёт/нечёт недели (`rrule`), напоминания.
- **Проекты**: Kanban, Список, Календарь, Таблица; Markdown‑описания.
- **Библиотека**: хранение файлов/ссылок, теги, поиск; предпросмотр PDF.
- **Задания**: карточки с дедлайнами, статусы, вложения, тост‑напоминания.
- **Pomodoro**: таймер, статистика времени, графики (recharts).
- **Карточки (SRS)**: Markdown + KaTeX, интервальные повторения.
- **Командная работа**: чат/уведомления через STOMP/WebSocket.

---

## Код‑стайл и качество

- ESLint + Typescript ESLint + Prettier (запуск: `npm run lint`).
- Рекомендуется включить Husky + lint-staged для pre-commit хуков.
- Тестирование: Vitest + Testing Library *(по мере роста проекта)*.

---

## Частые проблемы

- **VS Code предупреждает **`` — это директива Tailwind v4. Установите расширение *Tailwind CSS IntelliSense* и переключитесь на *Pre‑Release*; либо добавьте в `.vscode/settings.json`: `"css.lint.unknownAtRules": "ignore"`.
- **Alias **``** не работает** — проверь `tsconfig.json` и `vite.config.ts` (см. выше) и перезапусти dev‑сервер.
- **Ошибки с Tailwind CLI** — в v4 конфиг‑файлы не нужны, используйте `@tailwindcss/vite` и `@import "tailwindcss";` в стилях.

---

**Автор:** UniFlow FE Team

> Примечание: дизайн‑токены будут связаны с фирменной системой после утверждения макетов (shadcn/ui позволяет переопределить CSS‑переменные без переписывания компонентов).

