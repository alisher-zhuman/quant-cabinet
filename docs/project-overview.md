# Project Overview: Quant Cabinet

## Purpose

This project is a dedicated administrative dashboard (cabinet) for managing:

- Companies
- Users (and their permissions)
- Controllers
- Meters (devices that measure quantities)

The interface focuses strictly on operational control, monitoring, and CRUD workflows.

## Technical Direction

The codebase uses a modern React stack optimized for fast, interactive Single Page Applications (SPA):

- React 19
- TypeScript
- Vite (with SWC compiler)

State management and data fetching rely heavily on:

- Client-side data fetching via React Query and Axios.
- Local state management via Zustand.

## Architecture (FSD)

The project follows a layered frontend architecture based on the principles of **Feature-Sliced Design (FSD)**:

- `app`
- `pages`
- `widgets`
- `features`
- `entities`
- `shared`

This keeps routing, page composition, domain logic, and shared utilities strictly separated and maintainable.

## Layer Responsibilities

### `app`
Global configuration, providers, themes, and global routing (`main.tsx`, `router/`, `theme/`, `configs/`). Responsible for initializing the React tree.

### `pages`
Route-level components. Pages compose widgets and features to form views (e.g., `company-details`, `not-found`, `log-in`).

### `widgets`
Large, self-contained UI blocks that compose multiple features and entities. Examples: Header, Navigation sidebar, or complex data tables.

### `features`
Action-oriented workflows, interactions, and mutations. Examples: login form, forget password flow, editing a controller, assigning a meter.

### `entities`
Domain-specific state and reusable UI components. API models and React Query hooks for retrieving domain data from the server. Domains: `companies`, `users`, `controllers`, `meters`, `auth`.

### `shared`
Generic building blocks used across the project, completely independent of business logic. Examples: `api` instances, `locales`, common `schemas`, `hooks`, base `ui` components.

## Dependency Direction

Strict rules apply to imports (enforced by ESLint):

- `app -> pages -> widgets -> features -> entities -> shared`

**Critical Rules:**
- A layer cannot import from layers above it.
- Slices cannot import other slices within the same layer (e.g. `entities/user` cannot import from `entities/company`). Communication must be orchestrated in `features`, `widgets`, or `pages`.
- **Barrel Exports (`index.ts`) enforce the Public API:** ESLint strictly disallows deep imports into other slices (e.g., importing directly from `features/my-feature/ui/Button` is forbidden; import from `features/my-feature` instead).

## Data and Forms

The dashboard relies on client-side state and mutations:
- `react-hook-form` and `zod` are used for strictly typed form validation.
- Form logic is kept as low in the architecture as possible (shared utils in `shared`, domain validations in `entities`, submission logic in `features`).

## Internationalization

The platform uses `i18next` and `react-i18next` for translations, allowing scaling to multiple languages seamlessly.

## Who This Document Is For

This document is intended to help:
- The next AI assistant entering the repository.
- A new developer onboarding into the project.
- Anyone who needs a quick mental model before changing the code.
