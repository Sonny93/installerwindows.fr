FROM node:20.18.0

WORKDIR /usr/app
COPY ./ /usr/app

RUN pnpm install
RUN pnpm run build

EXPOSE 3000

CMD pnpm run start
