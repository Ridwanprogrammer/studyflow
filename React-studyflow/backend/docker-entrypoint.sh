#!/bin/bash
# StudyFlow Backend - Docker Entrypoint
# Runs migrations, then starts the application server

set -e

echo "🚀 StudyFlow Backend Starting..."
echo "   Django Settings: $DJANGO_SETTINGS_MODULE"
echo "   Database: ${DATABASE_URL:0:20}..."

# Wait for database to be ready (Railway PostgreSQL)
echo "⏳ Waiting for database..."
python << 'EOF'
import os
import time
import psycopg2
from urllib.parse import urlparse

database_url = os.environ.get('DATABASE_URL')
if database_url:
    parsed = urlparse(database_url)
    for i in range(30):
        try:
            conn = psycopg2.connect(
                host=parsed.hostname,
                port=parsed.port or 5432,
                user=parsed.username,
                password=parsed.password,
                database=parsed.path[1:],
                connect_timeout=3
            )
            conn.close()
            print("✅ Database is ready!")
            break
        except psycopg2.OperationalError as e:
            if i == 29:
                print(f"❌ Database connection failed after 30 attempts: {e}")
                exit(1)
            print(f"   Attempt {i+1}/30 - waiting for database...")
            time.sleep(2)
else:
    print("⚠️  DATABASE_URL not set, skipping database wait")
EOF

# Run database migrations
echo "📦 Running migrations..."
python manage.py migrate --noinput

# Create superuser if needed (optional, for first deploy)
if [ "$CREATE_SUPERUSER" = "true" ]; then
    echo "👤 Creating superuser..."
    python manage.py createsuperuser --noinput --username "${SUPERUSER_USERNAME:-admin}" --email "${SUPERUSER_EMAIL:-admin@studyflow.local}" || true
fi

# Collect static files (in case any were added after build)
echo "📁 Collecting static files..."
python manage.py collectstatic --noinput --clear

echo "✨ Startup complete! Starting server..."
echo "   Listening on 0.0.0.0:${PORT:-8000}"

# Execute the main command (gunicorn from Dockerfile CMD)
exec "$@"