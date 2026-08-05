#!/bin/bash
# Watcher: consulta el estado del batch cada 2 min; al completarse, descarga y actualiza.
# Uso: bash scripts/blog-images/watch-and-download.sh
set -u
cd "$(dirname "$0")/../.." || exit 1

MAX_CHECKS=60   # ~2 horas máximo
INTERVAL=120

for ((i = 1; i <= MAX_CHECKS; i++)); do
  OUT=$(npm run blog-images:status 2>&1)
  echo "[$(date +%H:%M:%S)] check $i/$MAX_CHECKS"

  if echo "$OUT" | grep -q "Estado: completed"; then
    echo "=== BATCH COMPLETED — descargando ==="
    npm run blog-images:download
    echo "=== WATCHER DONE ==="
    exit 0
  fi

  if echo "$OUT" | grep -qE "Estado: (failed|cancelled|expired)"; then
    echo "=== BATCH FALLÓ ==="
    echo "$OUT" | tail -20
    exit 1
  fi

  sleep "$INTERVAL"
done

echo "=== TIMEOUT: el batch no terminó en $(($MAX_CHECKS * $INTERVAL / 60)) minutos ==="
npm run blog-images:status
exit 2
