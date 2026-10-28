#!/usr/bin/env sh

set -e

image_tag="installerwindows.fr:weight"

docker build -t "${image_tag}" . >/dev/null

size_bytes="$(docker image inspect "${image_tag}" --format '{{.Size}}')"
awk "BEGIN { printf \"Docker image weight: %.3f Mo\n\", ${size_bytes}/1024/1024 }"
