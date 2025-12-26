# Backup/Restore

O sistema de backup/restore atualmente usa um volume docker para arquivar os backups do site e do banco de dados.

```yaml
  backup:
    name: ${ECOSYSTEM:-portal}backup
    external: true
```

O volume é criado como externo no script de setup:

```sh
[ -d ~/volumes/${ECOSYSTEM}backup ] || mkdir -p ~/volumes/${ECOSYSTEM}backup
[ "$(docker volume ls -q -f name=${ECOSYSTEM}backup)" ] || docker volume create -d local -o type=none -o device=~/volumes/${ECOSYSTEM}backup -o o=bind ${ECOSYSTEM}backup
```

Um container executa o backup periodicamente de acordo com uma agenda informada em `.backup.env`:

```ini
BACKUP_CRON_EXPRESSION="0 0 * * 0"
```

Esta agenda programa o backup para ser executado às 0h de domingo.

O volume criado na pasta `volumes` do usuário do portal irá conter arquivos compactados dos backups, como por exemplo:

```bash
-rw-r--r-- 1 root   root   266308432 set 30 10:06 backup-2025-09-30T13-06-50.tar.gz
```

## Executar backup manual

Para executar um backup é recomendado parar a aplicação e o servidor de banco de dados:

```sh
docker stop portal-app portal-db
```

Em seguida podemos executar um backup manual

```sh
docker exec portal-backup backup
```

O arquivo de backup contendo todos os volumes será salvo no volume criado na pasta `volumes` do usuário portal.

Ao finalizar re-iniciar os serviços da aplicação

```sh
docker start portal-app portal-db
```

## Restaurar backup

Para restaurar um backup sugerimos mais uma vez parar os serviços da aplicação e em seguida, na pasta `volumes`, mover os volumes pré-existentes para uma pasta temporária:

```sh
docker stop portal-app portal-db
cd  ~/volumes
mv portaldata portaldata.tmp
mv portaldbdata portaldbdata.tmp
```

Descompactar o arquivo de backup:

```sh
cd ~/volumes/portalbackup
tar -xvf backup-2025-09-30T13-06-50.tar.gz
mv portaldata  ../portaldata
mv portaldbdata ../portaldbdata
```

> **Obs**.: Pode ser necessário ajustar o proprietário de arquivos e pastas caso o backup esteja sendo restaurado numa máquina diferente da original e o `uid` e `gid` do usuário local for diferente do usuário da máquina de origem dos arquivos. No geral, a pasta `portaldata` somente precisa alterar o proprietário raiz, porém a pasta `portaldbdata` pode precisar alterar todos os arquivos dentro dela (`chown -R ...`).

> **Obs**.: Substituir `portal` neste documento para o nome do ECOSYSTEM alvo (ver pasta [custom](./custom)).

## Backup de diferentes versões do MongoDB

Para migrar a versão do banco de dados para uma nova antes é necessário fazer um backup dos dados ainda na versão antiga. Antes registrar as variáveis de ambiente:

```sh
cd portal/site01
source .env
```

Fazer o backup do banco de dados:

```sh
docker exec -i ${ECOSYSTEM}-db -u root -p ${SVC_PWD} mongodump --out /data/backup/
docker exec -i ${ECOSYSTEM}-db tar -cvzf /backup_mongodb.tar.gz /data/backup
```

Copiar o backup compactado para o host:

```sh
docker cp ${ECOSYSTEM}-db:/backup_mongodb.tar.gz ./backup_mongodb.tar.gz
```

Transferir para outro host:

```sh
sftp user@123.123.123.12
```

```sftp
get backup_mongodb.tar.gz
```

Copiar para o container destino:

```sh
docker cp  ./backup_mongodb.tar.gz ${ECOSYSTEM}-db:/backup_mongodb.tar.gz
docker exec -it ${ECOSYSTEM}-db tar -xzf ./backup_mongodb.tar.gz -C /
```

Restaurar o banco de dados:

```sh
docker exec -it ${ECOSYSTEM}-db mongorestore -u root -p ${SVC_PWD} --drop --dir /data/backup
```
