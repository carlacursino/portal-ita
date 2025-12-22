# Trabalhando com Workspace no VSCode

Este projeto possui configuração para ser executado num Workspace VSCode.

Se você seguiu as instruções em [SETUP](SETUP.md) já tem o ambiente quase pronto para execução. Se você já fez um clone do projeto talvez não tenha clonado as dependências, assim recomendamos iniciar com um ambiente sem os fontes.

Antes de mais nada é necessário instalar o Node.js para prosseguir:

* Instale [NVM](https://github.com/nvm-sh/nvm?tab=readme-ov-file#install--update-script)
* Instale [Node.js](https://nodejs.org/en/) e faça a versão instalada a corrente

**Obs**.: é necessário encerrar e re-abrir o VSCode para que o **NVM** configure as variáveis de ambiente

Este projeto foi testado até o momento com Node.js versões 18 (muito antiga, não use) e 22 (**LTS**, atualmente no release 21.1):

```sh
nvm install v22.21.1
```

Clone o repositório do projeto e seus sub-módulos:

```sh
git clone --recursive https://github.com/Portal-ITA/portal.git
```

Instale as dependências:

```sh
npm i --legacy-peer-deps
```

Crie uma cópia local do conteúdo estático do site:

```sh
cd site01
cp -r assets/default/* assets/static
```

Se houverem customizações do conteúdo estático copie-as também:

```sh
cp -r assets/customizado/* assets/static
```

O arquivo de configuração para execução local ([local.js](./site01/config/custom/local.js)) é uma cópia das configurações customizadas de cada site que existem na pasta [custom](./site01/custom/), porém com ajustes específicos para executar localmente (MongoDB por exemplo aponta para `localhost`). A aplicação rodando e utilizando este arquivo de configuração irá usar uma porta diferente da configurada para os containers.

Execute o projeto no VSCode. Se você seguiu as instruções em [SETUP](SETUP.md), já terá o banco de dados pronto. Basta usar o [launch.json](./.vscode/launch.json) pronto e executar a opção "Workspace Portal ITA".

O site estará disponível em [http://localhost:3000](http://localhost:3000) e o painel administrativo em [http://localhost:3000/admin](http://localhost:3000/admin) (usuário `cursino@ita.br` e senha `p4ssw0rd` - mude a senha deste usuário antes de prosseguir).

Restante da documentação detalhada:
* [Administradores e desenvolvedores](docs/man-tec.pdf)
* [Usuários finais (editores/redatores)](docs/man-usu.pdf)
