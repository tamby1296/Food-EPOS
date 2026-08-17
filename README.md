# Food EPOS

Tablet-first Electronic Point of Sale system for food businesses (restaurants, cafés, food trucks). React + TypeScript frontend, ASP.NET Core 8 / PostgreSQL backend.

- [`front/`](front/README.md) — React + Vite tablet UI
- [`back/`](back/README.md) — ASP.NET Core Web API

Each subfolder's README has details on running that piece individually (with or without Docker). This root README covers running the **whole stack** together with Docker Compose.

## Running the full stack with Docker

**Prerequisites**: Docker + Docker Compose.

```bash
cp .env.example .env
```

Edit `.env` and set:

- `POSTGRES_PASSWORD` — any password
- `JWT_KEY` — a random string, at least 32 characters

Then:

```bash
docker compose up --build
```

This starts three services:

| Service    | What it is                              | Default URL             |
|------------|------------------------------------------|--------------------------|
| `db`       | PostgreSQL 16                            | `localhost:5432`         |
| `backend`  | FoodEpos API (.NET 8)                    | `http://localhost:5287` (Swagger at `/swagger`) |
| `frontend` | React app, served by nginx               | `http://localhost:8080`  |

The frontend's nginx config proxies `/api/*` requests to the backend, so the app talks to the API on the same origin — visit `http://localhost:8080` and everything just works, no separate API URL configuration needed.

EF Core migrations and seed data (menu categories, meals, a default `admin`/`admin` login) are applied automatically when the backend container starts.

All ports and the `ASPNETCORE_ENVIRONMENT`/`JWT_EXPIRY_HOURS` values are overridable via `.env` — see [`.env.example`](.env.example) for the full list.

To stop everything:

```bash
docker compose down          # keep the database volume
docker compose down -v       # also delete the database volume
```

## Running without Docker

See [`back/README.md`](back/README.md) and [`front/README.md`](front/README.md) for running the API and the frontend directly with the .NET SDK and Node/Yarn.
