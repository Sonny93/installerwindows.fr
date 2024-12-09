FROM node:22-alpine3.18 AS builder

RUN apk --no-cache add curl
RUN corepack enable

WORKDIR /usr/app
COPY . .

RUN pnpm install --frozen-lockfile
RUN pnpm run build

FROM node:22-alpine3.18 AS final

WORKDIR /usr/app

COPY --from=builder /usr/app/.next/standalone /usr/app/.next/standalone
COPY --from=builder /usr/app/package.json /usr/app/pnpm-lock.yaml /usr/app/

RUN corepack enable

EXPOSE 3000
CMD ["node", ".next/standalone/server.js"]
