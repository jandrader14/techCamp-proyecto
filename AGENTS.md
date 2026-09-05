# AGENTS

This file helps coding agents work productively in this repository.

## Project Scope
- Monorepo-style layout with a React + TypeScript frontend at root and an Express + TypeScript backend under `backend/`.
- Shared domain types are in `shared/types/` and consumed by frontend/backend.

## Runbook (Use These Commands)
Run commands from repository root unless noted otherwise.

- Install dependencies: `npm install`
- Start full app (frontend + backend): `npm run dev`
- Start backend only: `npm run dev:server`
- Start frontend only: `npm run dev:client`
- Build: `npm run build`
- Lint: `npm run lint`
- Test: `npm run test`
- Test watch: `npm run test:watch`
- Preview frontend build: `npm run preview`

## Architecture Map
- Frontend app entry: `src/main.tsx`, `src/App.tsx`
- Frontend structure follows Atomic Design in `src/components/`:
  - `atoms/`, `molecules/`, `organisms/`, `layout/`, `pages/`
- Frontend API clients: `src/services/products.api.ts`, `src/services/recipes.api.ts`
- Backend entry: `backend/src/index.ts`
- Backend server wiring: `backend/src/server/server.ts`
- Backend layers:
  - routes: `backend/src/routes/`
  - controllers: `backend/src/controllers/`
  - services: `backend/src/services/`
  - models: `backend/src/models/`
  - external AI APIs: `backend/src/apis/`
  - utility helpers: `backend/src/utils/`
- Shared TS types: `shared/types/Recipe.ts`, `shared/types/product.ts`

## Environment Prerequisites
Backend requires environment variables. Ensure these exist before running backend flows:

- `MONGO_URI` (required)
- `PORT` (optional, defaults to 5000 in server config)
- `DEEPSEEK_API_KEY`
- `OPEN_AI_API_KEY`
- `ORGANIZATION_ID_OPEN_AI`
- `OPEN_AI_PROJECT_ID`
- `PIXABAY_API_KEY`
- `CLOUDINARY_CLOUD_NAME`
- `CLOUDINARY_API_KEY`
- `CLOUDINARY_API_SECRET`

## Working Conventions For Agents
- Keep frontend changes aligned with existing Atomic Design boundaries.
- Keep backend changes in the current layer pattern (route -> controller -> service -> model).
- Reuse shared interfaces from `shared/types/` rather than duplicating types.
- Add or update tests for behavior changes. Existing tests are currently sparse and frontend-focused.
- Prefer small, targeted edits over broad refactors unless requested.

## Known Pitfalls
- Frontend service URLs are hardcoded to `http://localhost:5000` in `src/services/*.api.ts`; backend must be running on that port unless those files are changed.
- No local MongoDB container is defined in `docker-compose.yml`; database connectivity depends on external MongoDB via `MONGO_URI`.
- Root `README.md` contains unresolved merge conflict markers; do not treat it as authoritative setup documentation until cleaned.
- SonarQube is configured via `docker-compose.yml` with host port `9001` for Sonar UI (`9000` inside container). Avoid assuming host port `9000`.

## Key References
- Project scripts/dependencies: [package.json](package.json)
- Backend package config: [backend/package.json](backend/package.json)
- TypeScript project refs: [tsconfig.json](tsconfig.json)
- Frontend TS options: [tsconfig.app.json](tsconfig.app.json)
- Lint config: [eslint.config.js](eslint.config.js)
- Test config: [jest.config.ts](jest.config.ts)
- Vite config + aliases: [vite.config.ts](vite.config.ts)
- Backend env config: [backend/src/config/index.ts](backend/src/config/index.ts)
- Backend DB bootstrap: [backend/src/database/index.ts](backend/src/database/index.ts)
- Sonar stack: [docker-compose.yml](docker-compose.yml)

## Session-History Notes
Recent project sessions show recurring setup friction around local SonarQube networking/auth and environment bootstrapping. When asked for analysis/security workflows, first verify ports, token auth, and required env vars before deeper debugging.
