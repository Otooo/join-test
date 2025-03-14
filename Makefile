LOG_LEVEL ?= DEBUG
DC_ALIAS = COMPOSE_LOG_LEVEL=$(LOG_LEVEL) docker compose --env-file backend/.env -f docker-compose.yml 


###############################################################################
## COMANDOS GERAIS
###############################################################################
.PHONY: help
help: ## Imprime todos os comandos quando make é digitado na linha de comando.
	@grep -E '^[%0-9a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'

.PHONY: up
up: ## Executa todos os containers: frontend, api e db.
	@if [ ! -f backend/.env ]; then cp backend/.env.docker backend/.env; echo "Arquivo .env criado a partir de .env.docker"; fi; \
	${DC_ALIAS} up --build -d

.PHONY: up-no-deps-*
up-no-deps-%: ## up-(frontend|api|db). Sobe o container especificado sem a dependência.
	@${DC_ALIAS} up --no-deps --build -d $*
	
.PHONY: up-*
up-%: ## up-(frontend|api|db). Executa o container especificado.
	@${DC_ALIAS} up --build -d $*

.PHONY: stop down
down: stop ## Igual ao comando stop
stop: ## Para os containers
	${DC_ALIAS} stop

.PHONY: stop-* down-*
stop-%: ## Assim como o down-%. With the wildcard -% in the dependency call to down-% it doesn't work, so it has to be done this way.
	@$(MAKE) down-$*
	
down-%: ## stop-(frontend|api|db). Para o container especificado.
	${DC_ALIAS} stop $*

.PHONY: logs
logs: ## Mostra o log dos containers.
	@${DC_ALIAS} logs -f -t

logs-%: ## logs-(frontend|api|db). Mostra os logs do container especificado.
	@${DC_ALIAS} logs -f -t $*



###############################################################################
## COMANDOS PARA O BACKEND
###############################################################################

.PHONY: api-help
api-help: ## Executa o comando help do makefile do backend.
	@${MAKE} -C backend help

.PHONY: tinker
tinker: ## Acessa o Laravel Tinker.
	@${MAKE} -C backend tinker

.PHONY: api-attach
api-attach: ## Acessar o container da API via bash.
	@${MAKE} -C backend attach

.PHONY: api-migrate
api-migrate: ## Roda as migrations do Laravel.
	@${MAKE} -C backend migrate

.PHONY: api-migrate-reset
api-migrate-reset: ## Reseta as migrations do Laravel.
	@${MAKE} -C backend migrate-reset

.PHONY: api-seed
api-seed: ## Roda os seeds do Laravel.
	@${MAKE} -C backend seed



###############################################################################
## COMANDOS PARA O FRONTEND
###############################################################################

.PHONY: front-help
front-help: ## Executa o comando help do makefile do frontend.
	@${MAKE} -C frontend help

.PHONY: front-attach
front-attach: ## Acessar o container do frontend via sh.
	@${MAKE} -C frontend attach