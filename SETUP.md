# Setup para servidor DCTA

Executar este SETUP **antes** de clonar o repositório de fontes.

Use a documentação em [RUN](RUN.md) para instruções de como clonar o repositório corretamente e executá-lo na máquina local corretamente.

## Acessar  o servidor

```sh
ssh -p 2030 ita_user@www.xxx.yyy.zzz
```

## Instalar Docker

```bash
# 1. Preparar diretório de chaves
apt update
apt install -y ca-certificates curl
install -m 0755 -d /etc/apt/keyrings

# 2. Baixar a chave GPG oficial do Docker
curl -fsSL https://download.docker.com/linux/debian/gpg -o /etc/apt/keyrings/docker.asc
chmod a+r /etc/apt/keyrings/docker.asc

# 3. Adicionar o repositório usando a variável do sistema ($(lsb_release -cs))
# Isso garante que ele pegue 'trixie' (13) ou 'bookworm' (12) automaticamente
echo "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.asc] https://download.docker.com/linux/debian $(. /etc/os-release && echo "$VERSION_CODENAME") stable" | tee /etc/apt/sources.list.d/docker.list > /dev/null

# 4. Instalar o Docker Engine
apt update
apt install -y docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin
```

### Criar usuário portal

É gerada uma senha aleatória (por exemplo `b36cdea4350847b7`):

```sh
echo 'USR_PASSWORD='$(openssl rand -hex 8) >> .env
    b36cdea4350847b7

source .env

adduser --disabled-password --gecos "" portal
usermod --password $(echo ${USR_PASSWORD} | openssl passwd -1 -stdin) portal
```

### Dar permissão no uso do Docker

Ao final terminar a sessão para iniciar a configuração do portal com o novo usuário:

```sh
usermod -aG docker ${USER}

usermod -aG docker portal
```

## Abrir sessão com usuário “portal”

Usando a senha criada mais acima (por exemplo `b36cdea4350847b7`):

```sh
ssh portal@www.xxx.yyy.zzz
```

### Obter projeto do portal

```sh
git clone https://github.com/Portal-ITA/portal.git

cd portal/site01
```

### Criar um arquivo de configuração do ambiente

Crie um arquivo `.env` com o seguinte conteúdo:

```ini
DOMAIN="site.ita.br www.site.ita.br"
HTTP=demo
LETSENCRYPT_EMAIL=email@ita.br
ECOSYSTEM=ZZZZZ
PORT=3008
SMTPUSR=email@ita.br
SMTPPWD=XXXXXXXXXXXX
SMTPSRV=smtp.ita.br
SMTPPRT=587
```

Substitua `ZZZZZ` pela configuração desejada na pasta [custom](./site01/custom/) (ou crie uma baseada numa delas) e `XXX..` pela senha da conta de e-mail para o site.

#### Criar novas configurações

Caso deseje criar uma configuração, além do arquivo com o nome da configuração na pasta [custom](./site01/custom/) você deverá ajustar corretamente a porta (**3008** no exemplo), a conexão com o serviço MongoDB, e ajustar o diretório de configurações [ecosystem.config.js](./site01/ecosystem.config.js) para adicionar a nova configuração:

_Arquivo de configuração de sites_:
```json
require('app-module-path').addPath(__dirname + '/helpers')

module.exports = {
    cms: {
        'port': 3008,
        
        'mongo': 'mongodb://portalAdmin:p4ssw0rd@ZZZZZ-db:27017/portal',
        

```

_Diretório de configurações `ecosystem.config.js`_:
```js
    env_paic: {
        NODE_ENV: "ZZZZZ",
    },
```

Adicione o id/gid usuário e uma chave para o mongodb:

```bash
echo "USER_ID=$(id -u)" >> .env
echo "GROUP_ID=$(id -g)" >> .env
echo "SVC_PWD=$(openssl rand -hex 8)" >> .env

source .env
```

#### Traduções do site

Caso deseje criar traduções particulares para termos utilizados no site, basta encontrar o termo num dos arquivos de idiomas:

* [Português - pt.js](./site01/translations/pt.js)
* [Inglês - pt.js](./site01/translations/pt.js)

Crie uma pasta com a configuração (por exemplo `ZZZZZ`) e insira a tradução seguindo o caminho de chaves dos arquivos acima:

```json
module.exports = {
    partials: {
        credits: {
            author: "Criação: <a href='mailto:ceds@ita.br'>ceds@ita.br</a>",
        },
    }
}
```

Faça o mesmo para os demais idiomas disponíveis (atualmente apenas **Português** e **Inglês**).

#### Template `demo` do NGINX

No arquivo `.env` está especificado:

```ini
HTTP=demo
```

Isto se refere à template NGINX [demo.conf.template](./site01/config/nginx/demo.conf.template).

Use uma template customizada (se necessário) ou mude para [portal.conf.template](./site01/config/nginx/portal.conf.template) antes de enviar para produção.

### Inicalizar o MongoDB pela primeira vez

Para a variável `${ECOSYSTEM}` funcionar, basta executar sempre `source .env` na pasta `site01`.

```sh
mkdir -p ~/volumes/${ECOSYSTEM}dbdata
docker volume create -d local -o type=none -o device=~/volumes/${ECOSYSTEM}dbdata -o o=bind ${ECOSYSTEM}dbdata
docker compose up -d mongodb
docker exec -it ${ECOSYSTEM}-db mongo  -u root -p ${SVC_PWD}
```

No console do MongoDB criar o banco de dados e usuário inicial:

```js
use portal
db.createUser({ user: "portalAdmin", pwd: "p4ssw0rd", roles: [ "dbOwner" ]})
```

### Criar containers

De volta ao console do sistema operacional, criar os containers de acordo com o ambiente:

* **Desenvolvimento** - versão que executa os serviços de banco de dados, console para consulta ao banco de dados (usando [Mongo Express]()) e a aplicação
* **Produção** - versão que executa os serviços de banco de dados, backup, renovação de certificados digitais e a aplicação
* **Total** - versão que executa todos os serviços, tanto de desenvolvimento quanto de produção -- **ATENÇÃO**: *esta versão não deve ser mantida em ambientes de produção e somente usada em exceções, como para diagnosticar problemas*

#### Para executar em modo **Desenvolvimento**

```sh
./scripts/setup.sh --dev
```

#### Para executar em modo **Produção**

```sh
./scripts/setup.sh --dev
```

#### Para executar **todos** os serviços

```sh
./scripts/setup.sh --all
```

#### Para encerrar **todos** os serviços

Basta informar setup sem nenhum parâmetro:

```sh
./scripts/setup.sh
```

Para encerrar serviços individuais basta parar cada um individualmente:

* **Banco de Dados** - `docker stop ${ECOSYSTEM}-db`
* **Console do DB** - `docker stop ${ECOSYSTEM}-console`
* **Backup** - `docker stop ${ECOSYSTEM}-backup`
* **Proxy HTTP** - `docker stop ${ECOSYSTEM}-http`
* **Certbot** - `docker stop ${ECOSYSTEM}-certbot`
* **Aplicação** - `docker stop ${ECOSYSTEM}-app`
 
### Abrir página administrativa do portal num browser

O usuário previamente configurado pelo sistema está em [First User](./site01/updates/1.0.1-first-user.js)

```
http://www.xxx.yyy.zzz/admin/signin
    email: itauser@ita.br
    password: p4ssw0rd
```

### Preparar o portal

Seguir instruções do [Manual do Usuário](./docs/man-usu.pdf).
