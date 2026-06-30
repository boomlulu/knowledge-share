#!/bin/zsh

set -euo pipefail

ROOT_DIR="$(cd "$(dirname "$0")" && pwd)"
SLIDEV_DIR="${ROOT_DIR}/slidev"
NODE_BIN="/Users/boom/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin/node"
PORT="3030"
URL="http://localhost:${PORT}/"

if [[ ! -d "$SLIDEV_DIR" ]]; then
  echo "Slidev directory not found: $SLIDEV_DIR" >&2
  exit 1
fi

if [[ ! -x "$NODE_BIN" ]]; then
  echo "Node runtime not found: $NODE_BIN" >&2
  exit 1
fi

cd "$SLIDEV_DIR"

if [[ ! -x "./node_modules/.bin/slidev" ]]; then
  echo "Slidev executable not found: ${SLIDEV_DIR}/node_modules/.bin/slidev" >&2
  echo "Run npm install in ${SLIDEV_DIR} first." >&2
  exit 1
fi

if curl -fsS "$URL" >/dev/null 2>&1; then
  open "$URL"
  echo "Slidev is already running at ${URL}"
  exit 0
fi

(sleep 3; open "$URL") >/dev/null 2>&1 &
echo "Starting Slidev at ${URL}"
exec "$NODE_BIN" ./node_modules/.bin/slidev --port "$PORT"
