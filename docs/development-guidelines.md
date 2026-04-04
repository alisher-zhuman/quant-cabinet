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

- Store reusable type aliases in `types.ts`.
- Infer types from Zod schemas using `z.infer`.
- Do not duplicate shapes manually if a Zod schema already defines them.
- If a type is exclusively needed by an adjacent `api.ts`, it does not strictly need to be exported from `types.ts`; it can be inferred locally within `api.ts`.
- Do not keep intermediate or unused helper types in `types.ts`.

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
