#!/usr/bin/env bash
set -euo pipefail

docker stop inovalab || true
docker rm inovalab || true
docker rmi inovalab || true

DOCKER_BUILDKIT=1 ECOSYSTEM=inovalab PORT=3006 USER_ID=$(id -u) GROUP_ID=$(id -g) docker compose -f docker-compose.yaml up --build --detach
