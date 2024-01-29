#!/bin/bash
# wait-for-postgres.sh

set -e

host="$1"
port="$2"
shift 2
cmd="$@"

until PGPASSWORD=$PG_PASSWORD psql -h "$host" -p "$port" -U "$PG_USER" -c '\q'; do
  >&2 echo "Postgres is unavailable - sleeping"
  sleep 1
done

# Añadimos un retraso adicional para asegurar que PostgreSQL esté completamente inicializado
sleep 5

>&2 echo "Postgres is up - executing command"
PGPASSWORD=$PG_PASSWORD exec $cmd
