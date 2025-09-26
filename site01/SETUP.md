# Setup de um portal institucional

## Criar usuário portal

```sh
echo 'USR_PASSWORD='$(openssl rand -hex 8) >> .env

source .env

sudo adduser --disabled-password --gecos "" portal
sudo usermod --password $(echo ${USR_PASSWORD} | openssl passwd -1 -stdin) portal
```

### Dar permissão no uso do Docker

```sh
sudo usermod -aG docker ${USER}

sudo usermod -aG docker portal

exit
```

### Criar chave para usuário “portal”

```
ssh-keygen
chmod 600 ~/.ssh/id_rsa
ssh-copy-id -p 2030 portal@161.24.29.13
```

### Abrir sessão com usuário “portal”

```sh
ssh -p 2030 portal@161.24.29.13
```

### Criar volumes para containers

Os volumes serão criados numa pasta local para facilitar o backup.

Volumes adicionais, como os usados pelos certificados digitais, não serão criados numa pasta local e não precisam de backup.

```sh
mkdir -p ~/volumes/dronedata
mkdir -p ~/volumes/dronedbdata

docker volume create -d local -o type=none -o device="/home/portal/volumes/dronedata" -o o=bind dronedata
docker volume create -d local -o type=none -o device="/home/portal/volumes/dronedbdata" -o o=bind dronedbdata
```

## Obter projeto do portal

```sh
git clone https://github.com/carlacursino/portal-ita.git

cd portal-ita/site01
```

### Criar chave para mongodb

```sh
echo 'SVC_PWD='$(openssl rand -hex 8) > .env

source .env
```

### Criar containers

```sh
./scripts/setup.sh
```

### Criar banco de dados do portal

Use a `<<senha mongodb>>` criada no passo **Criar chave para mongodb**.

```
docker exec -it mongodb mongo  -u root -p <<senha mongodb>>

    use portal
    db.createUser({ user: "portalAdmin", pwd: "p4ssw0rd", roles: [ "dbOwner" ]})
    exit
```
