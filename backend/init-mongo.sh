#!/bin/bash
set -e  # Exit on any error

# Authenticate as root and create the user in the target database
mongosh <<EOF
db.auth('$MONGO_INITDB_ROOT_USERNAME', '$MONGO_INITDB_ROOT_PASSWORD');

// Switch to the target database (using env var)
db = db.getSiblingDB('$MONGO_DATABASE');

db.createUser({
  user: '$MONGO_USER',
  pwd: '$MONGO_PASSWORD',
  roles: [{ role: 'readWrite', db: '$MONGO_DATABASE' }]
});
EOF
