# Source : https://github.com/adonisjs-community/adonis-packages/blob/main/Dockerfile

# Keep in sync with the pnpm version in mise.toml
FROM ghcr.io/pnpm/pnpm:12.15.0-alpine AS pnpm

# Keep in sync with the node version in mise.toml
FROM node:26.12.1-alpine3.24 AS base

RUN apk --no-cache add curl

# Standalone pnpm binary, only needed to install dependencies and build
FROM base AS pnpm-base
COPY --from=pnpm /opt/pnpm /opt/pnpm
RUN ln -s /opt/pnpm/pnpm /usr/local/bin/pnpm

# All deps stage
FROM pnpm-base AS deps
WORKDIR /app
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
RUN pnpm install --ignore-scripts

# Production only deps stage
FROM pnpm-base AS production-deps
WORKDIR /app
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
RUN pnpm install --ignore-scripts --prod

# Build stage
FROM pnpm-base AS build
WORKDIR /app
COPY --from=deps /app/node_modules /app/node_modules
COPY . .

RUN pnpm run build

# Production stage
FROM base

ENV NODE_ENV=production
ENV LOG_LEVEL=debug
ENV CACHE_VIEWS=false
ENV SESSION_DRIVER=cookie
ENV PORT=$PORT

WORKDIR /app
COPY --from=production-deps /app/node_modules /app/node_modules
COPY --from=build /app/build /app
COPY --from=build /app/markdown /app/markdown
COPY --from=build /app/.adonisjs /app/.adonisjs
COPY --from=build /app/package.json /app/package.json

# Expose port
EXPOSE $PORT

# Start app

COPY scripts/entrypoint.sh /app/scripts/entrypoint.sh
RUN chmod +x /app/scripts/entrypoint.sh

CMD ["/app/scripts/entrypoint.sh"]
