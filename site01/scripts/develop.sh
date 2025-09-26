#!/usr/bin/env bash
set -euo pipefail

# Load environment variables
if [ -f .env ]; then
    set -a
    source .env
    set +a
fi

# Check required environment variables
if [ -z "$ECOSYSTEM" ] || [ -z "$PORT" ]; then
    echo "Error: ECOSYSTEM and PORT must be set in .env file"
    exit 1
fi

docker stop ${ECOSYSTEM}-app || true
docker rm ${ECOSYSTEM}-app || true
docker rmi ${ECOSYSTEM} || true

[ -d ~/volumes/${ECOSYSTEM}data ] || mkdir -p ~/volumes/${ECOSYSTEM}data
[ "$(docker volume ls -q -f name=${ECOSYSTEM}data)" ] || docker volume create -d local -o type=none -o device=~/volumes/${ECOSYSTEM}data -o o=bind ${ECOSYSTEM}data

[ -d ~/volumes/${ECOSYSTEM}dbdata ] || mkdir -p ~/volumes/${ECOSYSTEM}dbdata
[ "$(docker volume ls -q -f name=${ECOSYSTEM}dbdata)" ] || docker volume create -d local -o type=none -o device=~/volumes/${ECOSYSTEM}dbdata -o o=bind ${ECOSYSTEM}dbdata

DOCKER_BUILDKIT=1 docker compose --env-file .env -f docker-compose.yaml -f docker-compose.override.yaml up --build --detach app
