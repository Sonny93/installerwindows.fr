alias dw := docker-weight

# Start the dev database, wipe and reseed it, then run the dev server
dev:
	@docker compose down
	@docker compose -f dev.compose.yml pull
	@docker compose -f dev.compose.yml up -d --wait
	@node ace migration:fresh
	@node ace db:seed
	@pnpm run dev

# Drop and recreate every table
fresh:
	@node ace migration:fresh

# Build and start the production containers
prod:
	@docker compose -f dev.compose.yml down
	@docker compose pull
	@docker compose up -d --build --wait

# Run the database seeders
seed:
	@node ace db:seed

# Stop the dev and production containers
down:
	@-docker compose down
	@-docker compose -f dev.compose.yml down

# Run checks, then cut a release with release-it
release:
	@pnpm run release

# Run lint, format check, typecheck and tests
check:
	@pnpm run check

# Format and autofix the code
format:
	@pnpm run format

# Build the Docker image and print its size
docker-weight:
	@sh scripts/docker-weight.sh
