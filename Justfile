alias dw := docker-weight

dev:
	@docker compose down
	@docker compose -f dev.compose.yml pull
	@docker compose -f dev.compose.yml up -d --wait
	@node ace migration:fresh
	@node ace db:seed
	@pnpm run dev

fresh:
	@node ace migration:fresh

prod:
	@docker compose -f dev.compose.yml down
	@docker compose pull
	@docker compose up -d --build --wait

seed:
	@node ace db:seed

down:
	@-docker compose down
	@-docker compose -f dev.compose.yml down

release:
	@npx release-it

format:
	@pnpm run format

docker-weight:
	@sh scripts/docker-weight.sh
