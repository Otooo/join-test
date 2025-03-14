# JOIN TEST (BACKEND) [![project][project]]() ![version][version-badge]

Este projeto é uma API construída em Laravel para CRUD de Categorias de Produtos e Produtos. A aplicação é containerizada usando Docker.

A API estará rodando em **[http://localhost:9000/api](http://localhost:9000/api)**.

## Requisitos  
  1. [docker](https://www.docker.com/products/docker-desktop).
  2. Git.

## Informações  
- [docker](https://www.docker.com/products/docker-desktop): Mais atual
- [MySQL](https://hub.docker.com/_/mysql): Versão 8.0
- [PHP](https://hub.docker.com/_/php): Versão 8.2-fpm
  
### Utilitário para executar **Makefile** (Opcional)
  1. ***Windows***: [Cygwin](https://www.cygwin.com) ou [MinGW](http://www.mingw.org).
  2. ***Linux***: GNU toolchain (padrão no Linux).

## Comandos úteis
  * Lista comandos do makefile. Vide [Makefile][MAKEFILE].  
    `make help` ou `make`
  * Acessa o container do laravel.
    `make attach`  
    ou  
    `docker compose --env-file .env -f ../docker-compose.yml exec api bash`  
  * Acessa o tinker.
    `make attach`  
    ou  
    `docker compose --env-file backend/.env -f docker-compose.yml exec api bash`  


[MAKEFILE]: ./Makefile
[project]: https://img.shields.io/badge/join-tomato.svg
[version-badge]: https://img.shields.io/badge/version-1.0.0-blue.svg
