FROM node:22-alpine3.18 AS base

RUN apk --no-cache add curl
RUN corepack enable

WORKDIR /usr/app
COPY ./ /usr/app

RUN pnpm install
RUN pnpm run build

EXPOSE 3000

CMD ["pnpm", "run", "start"]
