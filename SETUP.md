# Setup para servidor DCTA

## Acessar  o servidor

```sh
ssh -p 2030 ita_user@www.xxx.yyy.zzz
```

## Instalar Docker

```sh
sudo apt update

sudo apt install apt-transport-https ca-certificates curl gnupg

curl -fsSL https://download.docker.com/linux/debian/gpg | sudo gpg --dearmor -o /usr/share/keyrings/docker.gpg

echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/docker.gpg] https://download.docker.com/linux/debian bookworm stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null

sudo apt update

sudo apt install docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin
```

### Criar usuário portal

É gerada uma senha aleatória (por exemplo `b36cdea4350847b7`):

```sh
echo 'USR_PASSWORD='$(openssl rand -hex 8) >> .env
    b36cdea4350847b7

source .env

sudo adduser --disabled-password --gecos "" portal
sudo usermod --password $(echo ${USR_PASSWORD} | openssl passwd -1 -stdin) portal
```

### Dar permissão no uso do Docker

Ao final terminar a sessão para iniciar a configuração do portal com o novo usuário:

```sh
sudo usermod -aG docker ${USER}

sudo usermod -aG docker portal

exit
```

## Abrir sessão com usuário “portal”

Usando a senha criada mais acima (por exemplo `b36cdea4350847b7`):

```sh
ssh -p 2030 portal@www.xxx.yyy.zzz
```

### Criar volumes para containers

```sh
mkdir -p volumes/dronedata
mkdir -p volumes/mongodata

docker volume create -d local -o type=none -o device="/home/portal/volumes/dronedata" -o o=bind dronedata
docker volume create -d local -o type=none -o device="/home/portal/volumes/mongodata" -o o=bind mongodata
```

### Obter projeto do portal

```sh
git clone https://github.com/carlacursino/portal-ita.git

cd portal-ita/site01
```

### Criar chave para mongodb

É gerada uma senha aleatória (por exemplo `67bc6cb66f54888c`):

```sh
echo 'SVC_PWD='$(openssl rand -hex 8) > .env
    67bc6cb66f54888c

source .env
```

### Configurar autologin

Usando a senha criada mais acima (por exemplo `67bc6cb66f54888c`):

```sh
echo 'uri: "mongodb://root:'$SVC_PWD'@localhost:27017"' > ./config/mongodb/drone/config/.mdbpass
```

### Criar containers

```sh
./scripts/container.drone.sh
```

### Criar banco de dados do portal

Usando a senha criada mais acima (por exemplo `67bc6cb66f54888c`):

```sh
docker exec -it mongodb mongo  -u root -p 67bc6cb66f54888c 

    use portal
    db.createUser({ user: "portalAdmin", pwd: "p4ssw0rd", roles: [ "dbOwner" ]})
    exit
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
