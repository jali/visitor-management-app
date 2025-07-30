#!/bin/bash
set -e  # Exit on any error

# Wait for MongoDB port to be open
until nc -z mongo 27017; do
  echo "Waiting for MongoDB..."
  sleep 2
done

# Run seeding
node src/seed.js

# Start the app
#exec node src/index.js


#    entrypoint: /app/entrypoint.sh