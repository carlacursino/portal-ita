#!/usr/bin/env bash
set -euo pipefail

# Load environment variables
if [ -f .env ]; then
    set -a
    source .env
    set +a
else
    echo "Error 🧨: .env file not found"
    exit 1
fi

if [ -z "$ECOSYSTEM" ] || [ -z "$PORT" ]; then
    echo "Error 🧨: ECOSYSTEM and PORT must be set in .env file"
    exit 1
fi

# Create missing values in .env file
if [ -z "$USER_ID" ] || [ -z "$GROUP_ID" ] || [ -z "$SVC_PWD" ]; then
    echo "USER_ID=$(id -u)" >> .env
    echo "GROUP_ID=$(id -g)" >> .env
    echo "SVC_PWD=$(openssl rand -hex 8)" >> .env
    set -a
    source .env
    set +a
fi


docker stop ${ECOSYSTEM}-app || true
if [ $# -ne 0 ]; then
    echo "💣 Removing old containers..."
    docker rm ${ECOSYSTEM}-app || true
    docker rmi ${ECOSYSTEM} || true
    docker stop ${ECOSYSTEM}-http || true
    docker rm ${ECOSYSTEM}-http || true
fi

[ -d ~/volumes/${ECOSYSTEM}data ] || mkdir -p ~/volumes/${ECOSYSTEM}data
[ "$(docker volume ls -q -f name=${ECOSYSTEM}data)" ] || docker volume create -d local -o type=none -o device=~/volumes/${ECOSYSTEM}data -o o=bind ${ECOSYSTEM}data

[ -d ~/volumes/${ECOSYSTEM}dbdata ] || mkdir -p ~/volumes/${ECOSYSTEM}dbdata
[ "$(docker volume ls -q -f name=${ECOSYSTEM}dbdata)" ] || docker volume create -d local -o type=none -o device=~/volumes/${ECOSYSTEM}dbdata -o o=bind ${ECOSYSTEM}dbdata

[ -d ~/volumes/${ECOSYSTEM}dbconfig ] || mkdir -p ~/volumes/${ECOSYSTEM}dbconfig
[ "$(docker volume ls -q -f name=${ECOSYSTEM}dbconfig)" ] || docker volume create -d local -o type=none -o device=~/volumes/${ECOSYSTEM}dbconfig -o o=bind ${ECOSYSTEM}dbconfig

if [[ "$*" != *"--dev"* ]]; then
    [ -d ~/volumes/${ECOSYSTEM}backup ] || mkdir -p ~/volumes/${ECOSYSTEM}backup
    [ "$(docker volume ls -q -f name=${ECOSYSTEM}backup)" ] || docker volume create -d local -o type=none -o device=~/volumes/${ECOSYSTEM}backup -o o=bind ${ECOSYSTEM}backup
fi

# Check developer mode
if [[ "$*" == *"--dev"* ]]; then
    echo "🚀 Starting in developer mode..."
    DOCKER_BUILDKIT=1 docker compose --env-file .env -f docker-compose.yaml -f docker-compose.override.yaml up --build --detach mongodb nginx console app
elif [[ "$*" == *"--prod"* ]]; then
    echo "🚀 Starting in production mode..."
    DOCKER_BUILDKIT=1 docker compose --progress=plain --env-file .env -f docker-compose.yaml up --build --detach backup mongodb nginx certbot app
elif [[ "$*" == *"--all"* ]]; then
    echo "🚀 Starting all services..."
    DOCKER_BUILDKIT=1 docker compose --progress=plain --env-file .env -f docker-compose.yaml up --build --detach
else
    echo "💣 All services stopped..."
    DOCKER_BUILDKIT=1 docker compose --progress=plain --env-file .env -f docker-compose.yaml stop
fi
