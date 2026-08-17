# FoodEpos API

ASP.NET Core 8 Web API backing the FoodEpos tablet till app. Entity Framework Core over PostgreSQL, JWT bearer auth, Swagger UI in development.

## Tech stack

- .NET 8 / ASP.NET Core Web API
- Entity Framework Core 9 + Npgsql (PostgreSQL)
- JWT bearer authentication
- Swashbuckle (Swagger / OpenAPI)

## Project layout

```
back/
├── FoodEpos.sln
└── FoodEpos/
    ├── Controllers/     # AuthController, MealController, CartController, OrderController
    ├── Data/             # DbContext + DbInitializer (runs migrations + seed data on startup)
    ├── Migrations/       # EF Core migrations
    ├── Model/            # Entities + DTOs
    ├── Services/         # TokenService, OrderMapper
    └── Program.cs
```

## Running locally (without Docker)

**Prerequisites**: [.NET 8 SDK](https://dotnet.microsoft.com/download/dotnet/8.0), a PostgreSQL instance reachable from your machine.

1. Configure the connection string and JWT key. Either edit `FoodEpos/appsettings.Development.json` (gitignored if you add secrets there) or use [user secrets](https://learn.microsoft.com/aspnet/core/security/app-secrets):

   ```bash
   cd FoodEpos
   dotnet user-secrets set "ConnectionStrings:FoodEposConnectionString" "Host=localhost;Port=5432;Database=foodepos;Username=postgres;Password=yourpassword"
   dotnet user-secrets set "Jwt:Key" "a-random-string-at-least-32-characters-long"
   ```

2. Run the API:

   ```bash
   dotnet run --project FoodEpos
   ```

   Migrations and seed data (categories, meals, a default `admin`/`admin` user) are applied automatically on startup via `DbInitializer.Initialize`.

3. The API listens on `http://localhost:5287` (see `FoodEpos/Properties/launchSettings.json`). Swagger UI is available at `http://localhost:5287/swagger` in the `Development` environment.

To add a new migration after changing models:

```bash
cd FoodEpos
dotnet ef migrations add <MigrationName>
```

## Running inside Docker

The API has its own [Dockerfile](Dockerfile) (multi-stage: SDK build → aspnet runtime, non-root user, listens on port `8080` inside the container). The easiest way to run it is via the **root-level Docker Compose** setup, which also brings up Postgres and the frontend — see the [repo root README](../README.md) / `docker-compose.yml` for the full stack:

```bash
# from the repo root
cp .env.example .env   # set POSTGRES_PASSWORD and JWT_KEY
docker compose up --build backend db
```

This starts Postgres and the API together, applies migrations automatically, and exposes the API on `http://localhost:5287` (configurable via `BACKEND_PORT` in `.env`).

### Building/running just this image

You can also build and run the backend image standalone, e.g. against a Postgres instance you manage yourself:

```bash
cd back
docker build -t foodepos-api .

docker run --rm -p 5287:8080 \
  -e ASPNETCORE_ENVIRONMENT=Production \
  -e ConnectionStrings__FoodEposConnectionString="Host=host.docker.internal;Port=5432;Database=foodepos;Username=postgres;Password=yourpassword" \
  -e Jwt__Key="a-random-string-at-least-32-characters-long" \
  -e Jwt__ExpiryHours=8 \
  foodepos-api
```

Notes:

- `Jwt__Key` and `ConnectionStrings__FoodEposConnectionString` use ASP.NET Core's double-underscore convention for nested configuration keys, and always take precedence over the placeholder values checked into `appsettings.json`.
- The container has a `HEALTHCHECK` that pings `GET /api/meal`; a `401` response still counts as healthy (that route requires auth) — only an unreachable connection fails it.
- `docker-compose.yml` at the repo root talks to Postgres via the service name `db`; if you're running this container by itself against a host-machine Postgres, use `host.docker.internal` (Windows/Mac) instead.
