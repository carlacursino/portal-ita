#!/usr/bin/env bash
set -euo pipefail

docker stop portal || true
docker rm portal || true
docker rmi portal || true

DOCKER_BUILDKIT=1 USER_ID=$(id -u) GROUP_ID=$(id -g) docker compose -f docker-compose-drone.yaml up --build --detach
