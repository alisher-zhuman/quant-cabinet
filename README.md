# Quant Cabinet

**Quant Cabinet** is an administrative dashboard (cabinet) for monitoring and managing companies, users, controllers, and meters.

## Tech Stack

The project is built using a modern React stack:
- **Core**: React 19, TypeScript, Vite (with SWC compiler).
- **State Management**: Zustand (client state) and React Query (server state / API).
- **UI & Forms**: Material UI (MUI v7), React Hook Form, Zod.
- **Routing**: React Router v7.
- **Linting & Typing**: ESLint with strict Feature-Sliced Design (FSD) rules enforced.
- **Internationalization (i18n)**: i18next & react-i18next.

## Environment Variables

The project uses a `.env` file to store environment-specific configurations.
Expected public variables for the frontend include:

```env
VITE_API_URL="https://api.example.com"
```

Create a `.env` file in the root directory before running or building the app.

## Setup & Run

Ensure you have a recent version of Node.js installed.

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm run dev
   ```

## Available Scripts

- `npm run dev` — Starts the local development server.
- `npm run build` — Builds the app for production (includes type checking).
- `npm run preview` — Locally previews the built production bundle.
- `npm run lint` — Checks code quality using ESLint.
- `npm run typecheck` — Validates typings using TypeScript.
- `npm run check` — Runs both the linter and type checker.

## Architecture: Feature-Sliced Design (FSD)

The project strictly follows the **Feature-Sliced Design** methodology. Development takes place inside the `src/` directory, which is divided into the following layers:

- `app` — App initialization (global providers, router, themes).
- `pages` — Route-level components mapping UI to URLs.
- `widgets` — Large, self-contained UI blocks composed of multiple features and entities (e.g., navigation, complex tables).
- `features` — User scenarios and specific actions (e.g., login, profile edit, password reset).
- `entities` — Business domain models, API endpoints, hooks, and base UI components (`companies`, `users`, `controllers`, `meters`).
- `shared` — Reusable, domain-agnostic infrastructure code (e.g., locales, base validation schemas, axios instance).

**Key Architectural Rules:**
- **Unidirectional Layer Flow**: A module can only import logic from layers below it. Importing from `pages` to `features` is strictly prohibited.
- **Public API (Barrel Exports)**: Communication between slices occurs strictly via their `index.ts`. Deep imports (e.g., `import { Button } from '@entities/user/ui/Button'`) are forbidden and enforced by ESLint.
- **No Cross-Imports**: Slices within the same layer cannot import each other directly. If entities need to interact, this must be orchestrated at a higher layer (`features` or `widgets`).

> Detailed architectural and code style agreements are documented in [docs/development-guidelines.md](docs/development-guidelines.md).
