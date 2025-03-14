LOG_LEVEL ?= DEBUG
DC_ALIAS = COMPOSE_LOG_LEVEL=$(LOG_LEVEL) docker compose -f ../docker-compose.yml 
CONTAINER_NAME=frontend


.PHONY: help
help: ## Imprime todos os comandos quando make é digitado na linha de comando.
	@grep -E '^[%0-9a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'

.PHONY: attach
attach: ## Acessar o container do frontend via sh.
	@${DC_ALIAS} exec -it $(CONTAINER_NAME) sh