# Primera etapa: construir la aplicación
FROM python:3 AS builder

# Set unbuffered output for python
ENV PYTHONUNBUFFERED 1

# Install PostgreSQL client and required Perl modules
RUN apt-get update && apt-get install -y postgresql-client libdbd-pg-perl

# Create app directory
WORKDIR /app

# Install app dependencies
COPY requirements.txt .

RUN pip install --no-cache-dir -r requirements.txt

# Bundle app source
COPY . .

# Segunda etapa: crear la imagen final
FROM python:3-slim

COPY --from=builder /app/requirements.txt /app_django/requirements.txt

# Install Django y otras dependencias necesarias
RUN apt-get update && apt-get install -y postgresql-client libdbd-pg-perl \
    && pip install --no-cache-dir -r /app_django/requirements.txt

# Create app directory
WORKDIR /app_django

# Copia solo los archivos necesarios de la etapa de construcción
COPY --from=builder /app /app_django

# Set executable permissions for scripts
RUN chmod +x /app_django/django.sh
RUN chmod +x /app_django/wait-for-postgres.sh

# Expose port
EXPOSE 8000

# entrypoint para ejecutar el archivo django.sh
ENTRYPOINT ["/app_django/django.sh"]