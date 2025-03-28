# JOIN TEST [![project][project]]() ![version][version-badge]

Este projeto conta uma API construída em Laravel e um frontend em NextJS para CRUD de Categorias de Produtos e Produtos. A aplicação é containerizada usando Docker.

## Componentes  
- [Backend][backend]: Laravel
- [Frontend][frontend]: NextJS

## Requisitos  
  1. [docker](https://www.docker.com/products/docker-desktop).
  2. Git.
  
  
### Utilitário para executar **Makefile** (Opcional)
  1. ***Windows***: [Cygwin](https://www.cygwin.com) ou [MinGW](http://www.mingw.org).
  2. ***Linux***: GNU toolchain (padrão no Linux).


## Estrutura do Projeto
```bash
│── backend/               # Diretório contendo o projeto do backend
│── frontend/              # Diretório contendo o projeto do frontend
│── Makefile               # Arquivo descrevendo comandos para o utilitário make
│── docker-compose.yml     # Configuração do Docker Compose da aplicação
│── README.md              # Documentação do projeto
```

## Instalação
Siga os seguintes passos ([usando o makefile](#using-makefile) ou [docker compose](#using-docker-compose)):

#### Usando **Make**file:  
  1. Clone o project em sua máquina local.
  2. Execute `make up` na raiz do projeto. Isso irá preparar os arquivos para construir os containers e rodar no modo _daemon_.
  3. A aplicação WEB estará rodando em **[http://localhost:8080](http://localhost:8080)**.
  4. A API estará rodando em **[http://localhost:9000/api](http://localhost:9000/api)**.
   
#### Using **docker-compose**:  
  1. Clone o project em sua máquina local.
  2. Execute `cd backend && cp .env.docker .env ; cd ..` na raiz do projeto.
  3. Type ``docker compose --env-file backend/.env -f docker-compose.yml`` na raiz do projeto. Isso irá construir os containers e rodar no modo _daemon_.
  4. A aplicação WEB estará rodando em **[http://localhost:8080](http://localhost:8080)**.
  5. A API estará rodando em **[http://localhost:9000/api](http://localhost:9000/api)**.


## Comandos úteis

  * Lista comandos do makefile. Vide [Makefile][MAKEFILE].  
    `make help` ou `make`
  * Sobe todos os containers relacionados a aplicação.  
    `make up`  
    ou  
    `docker compose --env-file backend/.env -f docker-compose.yml up -d`  
  * Derruba todos os containers.  
    `make down`  
    ou  
    `docker compose --env-file backend/.env -f docker-compose.yml down`  
  * Acessa o container da API.
    `make api-attach`  
    ou  
    `docker compose --env-file backend/.env -f docker-compose.yml exec api bash`  
  * Acessa o container do Frontend.  
    `make frontend-attach`  
    ou  
    `docker compose --env-file backend/.env -f docker-compose.yml exec frontend bash`  
  

## TODO
  - Testes
  - Limpeza do código



[MAKEFILE]: ./Makefile
[project]: https://img.shields.io/badge/join-tomato.svg
[version-badge]: https://img.shields.io/badge/version-1.0.0-blue.svg

[backend]: ./backend/README
[frontend]: ./frontend/README