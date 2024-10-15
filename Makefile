build:
	docker build -t installerwindows-front .

start:
	docker compose up -d

prod: build
	@docker compose up -d --wait

release:
	npx release-it
