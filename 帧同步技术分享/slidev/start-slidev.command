#!/bin/zsh

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
NODE_BIN="/Users/boom/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin/node"
URL="http://localhost:3030/"

cd "$SCRIPT_DIR"

if curl -fsS "$URL" >/dev/null 2>&1; then
  open "$URL"
  echo "Slidev is already running at ${URL}"
  exit 0
fi

if [[ ! -x "$NODE_BIN" ]]; then
  echo "Node runtime not found: $NODE_BIN" >&2
  exit 1
fi

(sleep 3; open "$URL") >/dev/null 2>&1 &
echo "Starting Slidev at ${URL}"
exec "$NODE_BIN" ./node_modules/.bin/slidev
