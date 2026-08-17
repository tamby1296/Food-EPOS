# FoodEpos Frontend

Tablet-first React + TypeScript web app for the FoodEpos till system: menu browsing, order building, checkout, and an owner dashboard.

## Tech stack

- React 19 + TypeScript + Vite
- Tailwind CSS + Radix UI primitives
- Jotai (state) + TanStack Query (data fetching)
- React Router

## Project layout

```
front/
├── src/
│   ├── modules/       # Home, Checkout, Dashboard, Settings, Login, ...
│   ├── services/       # http client + per-resource API calls (auth, meals, cart, orders)
│   ├── components/
│   └── ...
├── vite.config.ts      # dev server proxies /api → http://localhost:5287
├── Dockerfile
└── nginx.conf
```

All API calls go through `src/services/http.ts`, which uses **relative URLs** (e.g. `/api/meal`) resolved against `window.location.origin` — so the same code works against the Vite dev proxy locally and against the nginx reverse proxy in Docker, without any base-URL configuration.

## Running locally (without Docker)

**Prerequisites**: Node 20+, Yarn, and the [backend API](../back/README.md) running on `http://localhost:5287` (the port the Vite dev server proxies `/api` to — see `vite.config.ts`).

```bash
yarn install
yarn dev       # starts Vite on http://localhost:5173
```

Other scripts:

```bash
yarn build     # tsc -b && vite build → dist/
yarn lint      # eslint .
yarn preview   # preview the production build locally
```

## Running inside Docker

The frontend has its own [Dockerfile](Dockerfile) (multi-stage: `yarn build` in a Node image, then the static `dist/` output is served by nginx). [`nginx.conf`](nginx.conf) serves the SPA (with a fallback to `index.html` for client-side routing) and reverse-proxies `/api/` to the `backend` container, so the app and API share one origin and no CORS setup is needed.

The easiest way to run it is via the **root-level Docker Compose** setup, which also brings up the backend and Postgres — see the [repo root README](../README.md) / `docker-compose.yml`:

```bash
# from the repo root
cp .env.example .env   # set POSTGRES_PASSWORD and JWT_KEY
docker compose up --build
```

The app is then served at `http://localhost:8080` (configurable via `FRONTEND_PORT` in `.env`).

### Building/running just this image

Because `nginx.conf` proxies `/api/` to a container reachable at the hostname `backend`, running this image standalone only makes sense on a Docker network where a `backend` service already exists — e.g. one created by the root `docker-compose.yml`:

```bash
cd front
docker build -t foodepos-frontend .
docker run --rm -p 8080:80 --network food-epos_default foodepos-frontend
```

(Replace `food-epos_default` with the actual network name Compose created — check with `docker network ls`.) For local frontend-only development against a live API, prefer `yarn dev` with the Vite proxy instead.
