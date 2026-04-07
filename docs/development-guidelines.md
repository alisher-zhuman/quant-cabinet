# Development Guidelines

This document serves as the single source of truth for architectural agreements and coding conventions within the project. 
If a rule changes, this document must be updated before the code is adjusted.

## Layers

- `shared`: Contains only generic, domain-agnostic code.
- `entities`: Contains API logic, schemas, types, and query hooks tied to a specific business entity.
- `features`: Implements specific user scenarios and actions on top of entities.
- `widgets`: Composes multiple features, entities, and shared modules into standalone UI blocks.
- `pages`: Assembles widgets to construct a full page.
- `app`: Handles bootstrapping, router setup, global providers, theming, and app-level orchestration.
- A `feature` must not import another `feature`.
- An `entity` must not import another `entity`.
- A `widget` must not import another `widget`.
- A `page` must not import another `page`.
- If logic needs to be shared across multiple slices within the same layer, push it down to `shared` or orchestrate it from a higher layer.

## Exports

- Retain barrel exports (`index.ts`).
- An `index.ts` file must exclusively export the slice's public API.
- If only a type is exported, use `export type { ... }`.
- If an entire file solely re-exports types, use `export type * from "..."`.
- Entities, hooks, helpers, types, or UI components only used internally within their own folder must remain private (do not export them).
- Avoid `export *` "just in case" from files containing internal implementation details.

## Schemas

- If a schema is locale-independent, define it as a standard static constant.
- If a schema requires localized error messages, implement it as a schema factory passing `t` as an argument.
- Avoid using the global `i18next.t(...)` within form schemas. Pass the translation function explicitly instead.
- Retain response and payload schemas within `schemas.ts`.

## Types

- Store reusable type aliases in `types/index.ts`.
- Infer types from Zod schemas using `z.infer`.
- Do not duplicate shapes manually if a Zod schema already defines them.
- If a type is exclusively needed by an adjacent `api.ts`, it does not strictly need to be exported from `types/index.ts`; it can be inferred locally within `api.ts`.
- Do not keep intermediate or unused helper types in `types/index.ts`.

## Slice Structure

- Organize code by slice responsibility first, and only then by file type.
- Prefer predictable folders over ad-hoc flat files scattered at the slice root.
- A slice root should usually expose only:
  - `index.ts`
  - stable top-level folders such as `api`, `model`, `hooks`, `ui`, `helpers`, `types`, `constants`, `columns`
- Do not place loose `types.ts`, `constants.ts`, `helpers.ts`, or similarly generic files directly in the slice root.
- If a concern exists, it should live in its own folder with `index.ts`.

Recommended patterns:

```text
entities/<slice>/
  api/index.ts
  hooks/index.ts            # optional, only if there are multiple internal hooks
  model/
    schemas.ts
    types.ts
    keys.ts
  index.ts
```

```text
features/<slice>/
  hooks/
    useSomething.ts
  ui/
    some-dialog/index.tsx
    some-actions/index.tsx
  helpers/index.ts
  columns/index.tsx         # only if this belongs to the feature
  types/index.ts
  constants/index.ts
  index.ts
```

```text
widgets/<slice>/
  hooks/
    useSomethingWidget.ts
  ui/
    some-widget/index.tsx
    some-section/index.tsx
    some-dialogs/index.tsx  # if the widget owns multiple related dialogs
  helpers/index.ts
  types/index.ts
  constants/index.ts
  index.ts
```

## Files and Folders

- Use a folder when the concern is named and reusable inside the slice:
  - `hooks`
  - `ui`
  - `helpers`
  - `types`
  - `constants`
  - `columns`
- Use `index.ts` or `index.tsx` inside those folders as the canonical entry.
- Keep naming explicit:
  - `useUsersWidget.ts`
  - `create-user-dialog/index.tsx`
  - `controller-actions/index.tsx`
  - `meter-status-badge/index.tsx`
- Avoid vague names such as `utils.ts`, `common.ts`, `data.ts`, `stuff.ts`.
- If a component grows large, split it by meaningful UI sections rather than by arbitrary line count.
- If a file exists only to support one adjacent file and is tiny, keep it close; if the concern becomes reusable or starts growing, move it into its own folder.

## Constants

- Store slice-level constants in `constants/index.ts`.
- Keep only real constants there: tab ids, static option lists, status maps, default values, etc.
- Do not move one-off literals into `constants` unless they are reused, semantically important, or make the main file clearer.
- Do not declare large configuration objects inline inside widgets or components if they are reused or make the file noisy.

## Helpers

- Store slice-specific helpers in `helpers/index.ts`.
- Keep helpers pure whenever possible.
- If a helper becomes generic across multiple slices, move it to `shared/helpers`.
- Do not hide business logic in component files if it can be expressed as a helper with a clear name.

## Hooks

- Keep hooks inside `hooks/`.
- Name hooks explicitly by intent:
  - `useUsersWidget`
  - `useCompanyForm`
  - `useDeleteUser`
- Entity hooks should generally wrap fetching logic.
- Feature hooks should generally wrap mutations, form setup, or scenario-specific state.
- Widget hooks should generally orchestrate UI state, routing, search params, dialogs, and table interactions.

## UI Components

- Keep UI components inside `ui/`.
- Use a separate folder per non-trivial component with `index.tsx`.
- If JSX becomes too large inside a widget or dialog, extract meaningful sections:
  - `meter-info-section`
  - `meter-controller-section`
  - `controller-company-section`
- Do not extract tiny components just to increase file count.
- Reusable project-wide primitives belong in `shared/ui`; slice-specific UI stays inside its slice.

## Entities

- Keep entity slices focused on domain data and server interaction.
- Entity slices should usually contain:
  - `api/index.ts`
  - `model/schemas.ts`
  - `model/types.ts`
  - `model/keys.ts`
  - query hooks
- Do not place page orchestration, dialogs, or screen-specific UI inside entities.

## Features

- Features own user actions and scenarios.
- A feature may contain:
  - mutation hooks
  - form hooks
  - dialogs
  - row actions
  - feature-specific helpers and columns
- If a piece of UI primarily exists to trigger a user action, it belongs in `features`, not in `widgets`.

## Widgets

- Widgets assemble screens from features, entities, and shared pieces.
- Keep page-level orchestration in widget hooks and widget UI.
- A widget may own:
  - table setup
  - search and pagination wiring
  - dialog state
  - tab state
  - row click navigation
- When a widget starts mixing layout, sections, formatting, and conditional subtrees in one file, split the UI into local sections.

## Pages

- Pages should stay thin.
- A page should usually only import and render the corresponding widget.
- Do not move page business logic into `pages` unless there is a route-only concern that truly belongs there.

## Naming

- Folder names should use kebab-case:
  - `company-details`
  - `create-user-dialog`
  - `meter-status-badge`
- Hook files should use camelCase with `use` prefix:
  - `useUserForm.ts`
  - `useMeterDetailsWidget.ts`
- Keep names aligned with responsibility. If a file handles delete behavior, name it around delete behavior.
- Prefer explicit route param names such as `companyId`, `controllerId`, `meterId` instead of generic `id`.

## Imports

- Use relative imports when working within the same layer/slice.
- Utilize alias imports strictly for external layer interactions via public APIs.
- Do not self-import a slice through its own barrel.
- If an import consists solely of types, utilize `import type { ... } from "..."`.
- For mixed imports, declare types inline: `import { type X, y } from "..."`.

## Features and UI

- If a UI component is exclusively used by one feature, keep it inside that feature's directory.
- Extract only genuinely reusable UI components into `shared/ui`.
- Heavy JSX code found in `columns` configurations (or similar) should be extracted into isolated UI components to prevent clutter.

## Helpers

- Do not leave loose helper functions in `columns`, `widget`, or `page` files if they grow complex.
- If a helper is specific to a single feature or entity, extract it to a local `helpers` folder.
- If a helper is genuinely reused across multiple slices, move it to `shared/helpers`.
- Do not export a helper if its usage stays strictly internal.

## Forms

- Construct all forms using `react-hook-form`.
- Validate forms efficiently via the `zodResolver`.
- Form validation error messages must be localized.

## API and Errors

- Implement API calls as entity-level functions.
- Display backend errors via a shared global helper that consistently extracts the message.
- Pending or success messages for mutations should be defined on the frontend using i18n variables.

## When in Doubt

- Always prefer a narrower, strictly defined public API.
- Always prefer explicit dependencies over implicit ones.
- Choose straightforward architectural implementation without unnecessary intermediary layers.
