# syntax=docker/dockerfile:1

# ---- Build stage ----
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src

# Restore first, using only the project file, so dependency layers are cached
# independently of source code changes.
COPY FoodEpos.sln ./
COPY FoodEpos/FoodEpos.API.csproj FoodEpos/
RUN dotnet restore FoodEpos/FoodEpos.API.csproj

# Copy the rest of the source and publish.
COPY FoodEpos/ FoodEpos/
RUN dotnet publish FoodEpos/FoodEpos.API.csproj \
    -c Release \
    -o /app/publish \
    --no-restore

# ---- Runtime stage ----
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS runtime
WORKDIR /app

# curl is needed for the HEALTHCHECK below; the base image doesn't ship it.
RUN apt-get update \
    && apt-get install -y --no-install-recommends curl \
    && rm -rf /var/lib/apt/lists/*

ENV ASPNETCORE_URLS=http://+:8080 \
    ASPNETCORE_ENVIRONMENT=Production \
    DOTNET_RUNNING_IN_CONTAINER=true

COPY --from=build /app/publish .

EXPOSE 8080

# No -f: /api/meal requires auth, so a 401 response is still proof the
# app is up. Only an unreachable connection should fail this check.
HEALTHCHECK --interval=30s --timeout=3s --start-period=15s \
    CMD curl -sS -o /dev/null http://localhost:8080/api/meal || exit 1

# The base aspnet image already ships a non-root "app" user (uid 64198).
USER app

ENTRYPOINT ["dotnet", "FoodEpos.API.dll"]
