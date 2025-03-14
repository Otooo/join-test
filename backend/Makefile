LOG_LEVEL ?= DEBUG
DC_ALIAS = COMPOSE_LOG_LEVEL=$(LOG_LEVEL) docker compose --env-file .env -f ../docker-compose.yml
CONTAINER_NAME=api


.PHONY: help
help: ## Imprime todos os comandos quando make é digitado na linha de comando.
	@grep -E '^[%0-9a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'

.PHONY: tinker
tinker: ## Acessa o Laravel Tinker.
	@${DC_ALIAS} exec $(CONTAINER_NAME) php artisan tinker

.PHONY: attach
attach: ## Acessar o container da API via bash.
	@${DC_ALIAS} exec -it $(CONTAINER_NAME) bash

.PHONY: migrate
migrate: ## Roda as migrations do Laravel.
	@${DC_ALIAS} exec $(CONTAINER_NAME) php artisan migrate --force

.PHONY: migrate-reset
migrate-reset: ## Reseta as migrations do Laravel.
	@${DC_ALIAS} exec $(CONTAINER_NAME) php artisan migrate:reset --force

.PHONY: seed
seed: ## Roda os seeds do Laravel.
	@${DC_ALIAS} exec $(CONTAINER_NAME) php artisan db:seed --force
