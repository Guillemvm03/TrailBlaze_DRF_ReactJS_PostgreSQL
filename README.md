# TrailBlaze

TrailBlaze es una aplicación de alquiler de bicicletas que utiliza tecnologías modernas como React.js, Django Rest Framework (DRF), Postgres, Tailwind CSS y Docker para proporcionar a los usuarios una experiencia de alquiler de bicicletas fluida y sostenible.

## Características Principales

- **Interfaz de Usuario**: Desarrollada con React.js para garantizar una experiencia de usuario fluida e intuitiva.
- **API**: Construida utilizando Django Rest Framework (DRF) para el manejo eficiente de las operaciones en el backend.
- **Base de Datos**: Utiliza Postgres para almacenar de forma segura la información de usuarios y bicicletas.
- **Estilización**: Estilización moderna y receptiva facilitada por Tailwind CSS.
- **Contenedorización**: Dockerizado para facilitar el despliegue y la gestión de entornos de desarrollo.

## Requisitos del Sistema

Asegúrate de tener instaladas las siguientes tecnologías en tu entorno de desarrollo:

- Node.js y npm (para React.js)
- Docker

## Configuración de Docker Compose

Docker Compose simplifica el proceso de gestión de aplicaciones Docker multi-contenedor. A continuación, se muestra una explicación de los servicios definidos en el archivo `docker-compose.yml`:

```yaml
version: "3.9"

services:
  frontend-react:
    build:
      context: ./frontend
    container_name: frontend_react
    working_dir: /app
    ports:
      - "5173:5173"
    volumes:
      - ./frontend:/app

  djangoapp:
    container_name: djangoapp
    build:
      context: ./backend
    restart: unless-stopped
    volumes:
      - ./backend:/app
      - ./backend/bk:/app_django/bk
    ports:
      - "8000:8000"
    environment:
      - PG_USER=kevin
      - PG_PASSWORD=1234
      - PG_DB=trailblaze
      - PG_PORT=5432
      - PG_HOST=local_pgdb
    depends_on:
      - db

  db:
    image: postgres:15
    container_name: local_pgdb
    restart: always
    ports:
      - "5433:5432"
    environment:
      POSTGRES_USER: "kevin"
      POSTGRES_PASSWORD: 1234
    volumes:
      - local_pgdata:/var/lib/postgresql/data
      - ./backend/bk/exportacion.sql:/docker-entrypoint-initdb.d/db_init.sql

  pgadmin:
    image: dpage/pgadmin4
    container_name: pgadmin4_container
    restart: always
    ports:
      - "8888:80"
    environment:
      PGADMIN_DEFAULT_EMAIL: kevin@domain-name.com
      PGADMIN_DEFAULT_PASSWORD: 1234
    volumes:
      - pgadmin-data:/var/lib/pgadmin
    depends_on:
      - djangoapp

  loadbalancer:
    image: nginx:latest
    container_name: nginx_loadbalancer
    ports:
      - "80:80"
    volumes:
      - ./loadbalancer/nginx.conf:/etc/nginx/nginx.conf:ro
    command: ["nginx", "-g", "daemon off;"]
    entrypoint: []

    depends_on:
      - djangoapp

  prometheus:
    image: prom/prometheus:v2.20.1
    container_name: prometheus_practica
    volumes:
      - ./backend/prometheus/prometheus.yml:/etc/prometheus/prometheus.yml
    command: --config.file=/etc/prometheus/prometheus.yml
    ports:
      - "9090:9090"
    depends_on:
      - djangoapp

  grafana:
    image: grafana/grafana:7.1.5
    container_name: grafana_practica
    restart: always
    ports:
      - "3500:3000"
    environment:
      - GF_SECURITY_ADMIN_PASSWORD=your_admin_password_here
      - GF_AUTH_DISABLE_LOGIN_FORM=true
      - GF_AUTH_ANONYMOUS_ENABLED=true
      - GF_AUTH_ANONYMOUS_ORG_ROLE=Admin
    volumes:
      - grafana-data:/var/lib/grafana
      - ./grafana/provisioning/datasources:/etc/grafana/provisioning/datasources
    depends_on:
      - prometheus

volumes:
  local_pgdata:
  pgadmin-data:
  grafana-data:


```

Esta configuración de Docker Compose define varios servicios:

- **frontend-react**: Construye el frontend de React, exponiéndolo en el puerto 5173.
- **djangoapp**: Ejecuta el backend de Django, exponiéndolo en el puerto 8000. Depende del servicio `db`.
- **db**: Servicio de base de datos PostgreSQL, utilizando la versión 15, expuesto en el puerto 5433.
- **pgadmin**: Ejecuta pgAdmin para la administración de PostgreSQL, accesible en el puerto 8888. Depende del servicio `djangoapp`.
- **loadbalancer**: Balanceador de carga Nginx para distribuir el tráfico entrante. Expone el puerto 80 y depende del servicio `djangoapp`.

## Instalación

Para instalar el proyecto TrailBlaze, sigue estos pasos:

1. Clona este repositorio: `git clone https://github.com/kevposesp/TrailBlaze_ReactJS_DRF_PostgreSQL.git`
2. Navega al directorio del proyecto: `cd TrailBlaze_ReactJS_DRF_PostgreSQL`
3. Cambiar a la rama de este modulo: `git checkout -t origin/main_docker_compose`
4. Instala las dependencias del frontend: `cd frontend && npm install && cd ..`
5. Configura las credenciales de la base de datos y otros parámetros en el archivo `.env`:

    - STRIPE_SECRET_KEY=tu_stripe_secret_key
    - SECRET_KEY=tu_secret_key_django
    - DB_ENGINE=django.db.backends.postgresql
    - DB_USER=tu_usuario_de_postgres
    - DB_PASSWORD=tu_contraseña_de_postgres
    - DB_NAME=nombre_de_tu_base_de_datos
    - DB_PORT=5432
    - DB_HOST=local_pgdb

6. Configura las credenciales en el archivo secrets.js del frontend:
    - Renombra el archivo secrets.example.js a secrets.js.
    - Reemplaza las credenciales con las tuyas:
    ```js
    const secrets = {
        URL_DRF: "http://localhost/api/",
        API_KEY: "tu_map_api_key",
        STRIPE_PUBLIC_KEY: "tu_stripe_public_key",
        EMAILJS: {
            PUBLIC_KEY: "tu_emailjs_key",
            TEMPLATE_ID: "tu_template_id",
            SERVICE_ID: "tu_service_id"
        }
    }

    export default secrets;
    ```

## Ejecución de la Aplicación

1. Inicia el docker-compose: `docker-compose up --build`

## Contribuciones

¡Las contribuciones son bienvenidas! Si tienes alguna sugerencia, problema o mejora, no dudes en crear un problema o enviar una solicitud de extracción.

## Licencia

Este proyecto está bajo la [Licencia MIT](LICENSE).