#!/usr/bin/env sh

set -e

docker build . >/dev/null

size_bytes="$(docker image inspect app-prod-installerwindows.fr:latest --format '{{.Size}}')"
awk "BEGIN { printf \"Docker image weight: %.3f Mo\n\", ${size_bytes}/1024/1024 }"
