# CRUD de usuários

### Essa aplicação foi desenvolvida com intúto de colocar em prátida conhecimentos nas tecnologias NodeJS com API's Restfull e banco de dados MongoDB utilizando conceitos básicos.

##### OBS.: Esse repositório foi dividido em duas sub pastas/projetos, sendo elas web e api. A pasta web existe um projeto front-end simples construído em ReactJS levando em conta conceitos básicos da tecnologia, como navegação, controle de estado e componentização. Já na pasta api existe um projeto contruido em NodeJS utilizando Koa como framework http, MongoDB para banco de dados e estruturação básica de docker e docker-compose para desenvolvimento.

# Dependências

1) Ter instalado Docker em seu computador, para mais informações de instalação clique aqui: [Install docker](https://docs.docker.com/install/).

2) Clonar [repositório](https://github.com/luizpaulolppa/crud-people-nodejs) em algum diretório.

# Para rodar a aplicação back-end (API)

        1) $ docker-compose build
        2) $ docker-compose run --rm api bash
        3) $ npm install
        4) $ exit
        5) $ docker-compose up api
        6) A aplicação já deve estar disponível na porta http://localhost:3001.
        7) Pode ser acessado o server do MongoDB por essa URL: 

# Para rodar a aplicação front-end (WEB)

        1) Navegue até a pasta web:
        2) $ cd /web
        3) $ npm install
        4) $ npm start
        6) A aplicação já deve estar disponível na porta http://localhost:3000.

# Para acessar bando de dados (MongoDB)

        1) Pode ser usado qualquer cliente de MongoDB, mas como exemplo pode ser usado o MongoDB Compass.