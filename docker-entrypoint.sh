#!/bin/sh

echo "Running migrations..."

npx prisma migrate deploy --preview-feature

echo "Ran the migrations"

# Start your application
npm run start:dev