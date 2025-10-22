# UniFlow

A comprehensive application for managing students' educational process: schedule, deadlines, projects (Kanban), materials library, Pomodoro, flash‑cards.

---

## Contents

- [Requirements](#requirements)
- [Quick start](#quick-start)
- [npm scripts](#npm-scripts)
- [Tech stack](#tech-stack)
- [Project structure](#project-structure)
- [Environment setup](#environment-setup)
- [UI: Tailwind v4 + shadcn/ui](#ui-tailwind-v4--shadcnui)
- [Features and modules](#features-and-modules)
- [Code style & quality](#code-style--quality)
- [Common issues](#common-issues)

---

## Requirements

- **Node.js ≥ 18.17** (LTS 20 recommended)
- **npm ≥ 9** or **pnpm / yarn**
- Browser with ES2022 support

---

## Quick start

```bash
# 1) Install dependencies
npm install

# 2) Run dev server
npm run dev

# 3) Production build
npm run build

# 4) Local preview of the build
npm run preview
```

> By default Vite serves the dev server at `http://localhost:5173`.

---

## npm scripts

- `dev` — start Vite dev server.
- `build` — type‑check (tsc) + Vite build.
- `preview` — local server to preview the built bundle.
- `lint` — run ESLint.
- `prepare` — initialize husky (git hooks) — if needed.

---

## Tech stack

**Core**

- React 19, Vite 7, TypeScript 5
- React Router 7
- Tailwind CSS **v4** + `@tailwindcss/vite`
- shadcn/ui (via CLI, components in `src/components/ui`)

**Data & offline**

- @tanstack/react-query — requests/cache/retries
- Dexie — IndexedDB (local‑first)
- Axios (optional; fetch can be used)

**State & forms**

- Zustand — lightweight global UI state
- react-hook-form + zod — type‑safe forms

**Dates & scheduling**

- date-fns, date-fns‑tz — dates, timezones
- rrule — recurring events (odd/even weeks and patterns)

**UI utilities & ecosystem**

- lucide-react — icons
- sonner — toasts
- cmdk — command palette (Cmd/Ctrl + K)
- react-resizable-panels — resizable panels
- @dnd-kit/core, @dnd-kit/sortable *(optional)* — drag & drop for Kanban

**Content**

- react-markdown, remark-gfm, rehype-raw — Markdown
- katex, rehype-katex — formulas
- pdfjs-dist — PDF viewing

**Lists, tables, visualization**

- @tanstack/react-table — tables
- @tanstack/virtual — list virtualization
- recharts — charts (Pomodoro/progress)

**Real‑time**

- sockjs-client, @stomp/stompjs — STOMP/WebSocket for Spring Boot

**Files**

- xlsx — import/export spreadsheets
- jszip — archiving
- react-dropzone — drag & drop uploads
- file-type — determine file formats

**Dev**

- ESLint, Prettier, Typescript ESLint, Husky, lint-staged
- vite-plugin-pwa *(optional later)*

See `package.json` for exact dependency versions.

---

## Project structure

```
uniflow/
├─ public/
├─ src/
│  ├─ app/              # App, routes, providers
│  ├─ components/
│  │  ├─ layout/        # Sidebar, Topbar
│  │  └─ ui/            # shadcn/ui components
│  ├─ pages/            # screens (Schedule, Projects, Tasks, ...)
│  ├─ entities/         # domain types (TS)
│  ├─ data/             # db.ts (Dexie), repositories/
│  ├─ store/            # Zustand
│  ├─ styles/           # index.css (Tailwind v4)
│  ├─ utils/            # helpers
│  └─ main.tsx
├─ index.html
├─ package.json
├─ tsconfig.json
├─ vite.config.ts
└─ ...
```

---

## Environment setup

### Import alias `@` → `src`

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

`src/styles/index.css` — minimum:

```css
@import "tailwindcss";
@import "tw-animate-css"; /* animations for shadcn */
```

### Dark theme (example)

In `index.css` you can declare theme variables:

```css
:root { /* light palette via CSS variables */ }
.dark { /* dark palette */ }
```

Theme toggle can be done by adding/removing the `dark` class on `html`/`body` or via `data-theme`.

---

## UI: Tailwind v4 + shadcn/ui

### Install shadcn/ui

```bash
npx shadcn@latest init
# then add components by name
npx shadcn@latest add button card input dialog textarea select
```

Components will appear in `src/components/ui/*`.

### Usage

```tsx
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export function Example(){
  return (
    <Card className="max-w-sm">
      <CardContent>
        <Button>Example</Button>
      </CardContent>
    </Card>
  );
}
```

---

## Features and modules

- **Schedule**: PDF import (manual markup → auto‑parsing later), odd/even weeks (`rrule`), reminders.
- **Projects**: Kanban, List, Calendar, Table; Markdown descriptions.
- **Library**: file/link storage, tags, search; PDF preview.
- **Tasks**: cards with deadlines, statuses, attachments, toast reminders.
- **Pomodoro**: timer, time statistics, charts (recharts).
- **Flashcards (SRS)**: Markdown + KaTeX, spaced repetition.
- **Collaboration**: chat/notifications via STOMP/WebSocket.

---

## Code style & quality

- ESLint + Typescript ESLint + Prettier (run: `npm run lint`).
- Husky + lint-staged recommended for pre-commit hooks.
- Testing: Vitest + Testing Library *(as project grows)*.

---

## Common issues

- **VS Code warns about @import** — this is a Tailwind v4 directive. Install *Tailwind CSS IntelliSense* and switch to *Pre‑Release*; or add to `.vscode/settings.json`: `"css.lint.unknownAtRules": "ignore"`.
- **Alias `@` doesn't work** — check `tsconfig.json` and `vite.config.ts` (see above) and restart dev server.
- **Tailwind CLI errors** — in v4 config files are not required; use `@tailwindcss/vite` and `@import "tailwindcss";` in your styles.

---

**Author:** UniFlow FE Team

> Note: design tokens will be tied to the brand system after mockups are approved (shadcn/ui allows overriding CSS variables without rewriting components).