dev:
	@docker compose down
	@docker compose -f dev.compose.yml pull
	@docker compose -f dev.compose.yml up -d --wait
	@node ace migration:fresh
	@node ace db:seed
	@pnpm run dev

prod:
	@docker compose -f dev.compose.yml down
	@docker compose pull
	@docker compose up -d --build --wait

down:
	@-docker compose down
	@-docker compose -f dev.compose.yml down

release:
	@npx release-it
