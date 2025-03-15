# JOIN TEST (FRONTEND) [![project][project]]() ![version][version-badge]

Este projeto é uma página WEB construída em NextJs para CRUD de Categorias de Produtos e Produtos. A aplicação é containerizada usando Docker.

A aplicação estará rodando em **[http://localhost:3000](http://localhost:3000)**.

## Requisitos  
  1. [docker](https://www.docker.com/products/docker-desktop).
  2. Git.

## Informações  
- [docker](https://www.docker.com/products/docker-desktop): Mais atual
- [Node](https://hub.docker.com/_/node): Versão 18-alpine
- [Template TAILADMIN](https://tailadmin.com/docs/update-logs/nextjs): Versão 2.0.1
  
### Utilitário para executar **Makefile** (Opcional)
  1. ***Windows***: [Cygwin](https://www.cygwin.com) ou [MinGW](http://www.mingw.org).
  2. ***Linux***: GNU toolchain (padrão no Linux).

## Comandos úteis
  * Lista comandos do makefile. Vide [Makefile][MAKEFILE].  
    `make help` ou `make`  
  * Acessa o container do frontend.  
    `make attach`  
    ou  
    `docker compose -f ../docker-compose.yml exec frontend sh`  


[MAKEFILE]: ./Makefile
[project]: https://img.shields.io/badge/join-tomato.svg
[version-badge]: https://img.shields.io/badge/version-1.0.0-blue.svg
