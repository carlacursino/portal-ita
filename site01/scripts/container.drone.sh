#!/usr/bin/env bash
set -euo pipefail

docker stop drone || true
docker rm drone || true
docker rmi drone || true

DOCKER_BUILDKIT=1 ECOSYSTEM=drone PORT=3003 USER_ID=$(id -u) GROUP_ID=$(id -g) docker compose -f docker-compose.yaml up --build --detach
