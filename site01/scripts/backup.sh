#!/bin/bash

docker run --rm --env-file ./.backup-on-off.env -v portaldbdata:/backup/mongobackup:ro -v portaldata:/backup/portalbackup:ro -v portalcerts:/backup/certbotcerts:ro -v portalchallenges:/backup/certbotchallenges:ro -v /var/run/docker.sock:/var/run/docker.sock:ro offen/docker-volume-backup:latest
