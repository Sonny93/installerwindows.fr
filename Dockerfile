FROM node:19.8.1

WORKDIR /usr/app
COPY ./ /usr/app

RUN pnpm install
RUN pnpm run build

EXPOSE 3000

CMD pnpm run start
