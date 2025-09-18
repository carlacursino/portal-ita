#!/usr/bin/env bash
set -euo pipefail

docker stop ceds || true
docker rm ceds || true
docker rmi ceds || true

DOCKER_BUILDKIT=1 ECOSYSTEM=ceds PORT=3002 USER_ID=$(id -u) GROUP_ID=$(id -g) docker compose -f docker-compose.yaml up --build --detach
