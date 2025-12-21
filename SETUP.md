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
PORT=3003
SMTPUSR=email@ita.br
SMTPPWD=XXXXXXXXXXXX
SMTPSRV=smtp.ita.br
SMTPPRT=587
```

Substitua `ZZZZZ` pela configuração desejada na pasta [custom](./site01/custom/) (ou crie uma baseada numa delas) e `XXX..` pela senha da conta de e-mail para o site.

Adicione o id/gid usuário e uma chave para o mongodb:

```bash
echo "USER_ID=$(id -u)" >> .env
echo "GROUP_ID=$(id -g)" >> .env
echo "SVC_PWD=$(openssl rand -hex 8)" >> .env

source .env
```

### Inicalizar o MongoDB pela primeira vez

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

De volta ao console do sistema operacional:

```sh
./scripts/setup.sh
```

### Abrir página administrativa do portal num browser

O usuário previamente configurado pelo sistema está em [First User](./site01/updates/1.0.1-first-user.js)

```
http://www.xxx.yyy.zzz/admin/signin
    email: itauser@ita.br
    password: p4ssw0rd
```

### Preparar o portal

Seguir instruções do [Manual do Usuário](./docs/man-usu.pdf).
