#!/bin/sh
set -e

# Install dependencies if node_modules is empty (first run with volume)
if [ ! -d "node_modules/@prisma" ]; then
  echo "Installing dependencies..."
  npm install
  npx prisma generate
fi

# Run database migrations
npx prisma migrate deploy 2>/dev/null || echo "No migrations to apply or DB not ready"

# Execute the main command
exec "$@"
