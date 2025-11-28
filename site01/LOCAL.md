# Executando o projeto para desenvolvimento no *VSCode*

* Faça um clone do repositório
* Instale [NVM](https://github.com/nvm-sh/nvm?tab=readme-ov-file#install--update-script)
* Instale [Node.js](https://nodejs.org/en/) e faça a versão instalada a corrente
* Instale o [Docker](https://www.docker.com)
* Configure uma versão de [docker-compose.yaml](./docker-compose.yaml) para atender suas necessidades de desenvolvimento - por exemplo, remover o [Nginx](https://nginx.org/en/), o backup, certbot e console do MongoDB (veja [docker-compose.yaml](./docker-compose.yaml))
* Execute o script de [setup](./scripts/setup.sh)
* Configure [launch.js](./.vscode/launch.json)

```json
"version": "0.2.0",
    "configurations": [
        {
            "type": "node",
            "request": "launch",
            "name": "Portal ITA",
            "skipFiles": [
                "<node_internals>/**"
            ],
            "env": {
                "NODE_ENV": "local",
            },
            "program": "${workspaceFolder}/server.js",
            "runtimeExecutable": "${userHome}/.nvm/versions/node/v22.19.0/bin/node"
        }
    ]
}
```

* Na linha abaixo configure a versão que usou quando instalou sua versão do [Node.js](https://nodejs.org/en/)

```json
                . . . 
            "runtimeExecutable": "${userHome}/.nvm/versions/node/<SUA VERSÃO DO NODE.JS>/bin/node"
                . . . 
```

> Use o comando `which` para determinar onde está a pasta da versão instalada!

* Instale os pacotes do projeto
* Crie um arquivo de configuração do site (obs.: algumas configurações são usadas para criar o container [Docker](https://www.docker.com) e configurar o _front-end_ [Nginx](https://nginx.org/en/) e podem ser ignoradas) - veja [Dockerfile.portal](./Dockerfile.portal) e [docker-compose.yaml](./docker-compose.yaml) para maiores informações

```ini
SVC_PWD=<uma senha>
USER_ID=<use user ID para container>
GROUP_ID=<use user ID para container>
DOMAIN="lista de domínios para Nginx"
LETSENCRYPT_EMAIL=<email para registro do domínio>
ECOSYSTEM=<escolha a configuração>
PORT=<uma porta local para o servidor de aplicação>
SMTPUSR=<usuário de email>
SMTPPWD=<senha do email>
SMTPSRV=<servidor de email>
SMTPPRT=<portal do servidor de email>
```

* Configure `ECOSYSTEM` com uma das configurações na pasta [custom](./custom)
* Configure uma portal local para rodar o serviço (por exemplo, `**3001**`)
* Faça uma cópia dos ativos do projeto e da desejada para a pasta `assets/static` (veja se existe configuração customizada para o `ECOSYSTEM` desejado)

```sh
cp -r ./assets/default/* ./assets/static
cp -r ./assets/${ECOSYSTEM}/. ./assets/static/
```

* Execute o `Launch` no *VSCode*
