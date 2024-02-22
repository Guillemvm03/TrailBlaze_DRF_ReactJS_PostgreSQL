# TrailBlaze

## Descripción
TrailBlaze es una aplicación para alquilar bicicletas, diseñada para ofrecer funcionalidades tanto a administradores como a usuarios. Los administradores pueden crear estaciones, gestionar el servidor y manejar aspectos relacionados con el backend, mientras que los usuarios tienen la capacidad de alquilar bicicletas, recargar saldo y reportar posibles problemas.

## Tecnologías Utilizadas
- Django Rest Framework (DRF)
- React JS
- Docker
- Docker Compose
- Tailwind CSS

## Requisitos Previos
Asegúrate de tener instalados Node.js, Docker y Docker Compose en tu sistema antes de proceder.

## Instalación
1. Configura los archivos `.env` tanto para el backend como para el frontend.
2. Ejecuta `npm install` en la carpeta del frontend para instalar las dependencias necesarias.

## Ejecución en un Entorno Local
Para ejecutar la aplicación en un entorno de desarrollo local, navega a la raíz del proyecto y ejecuta el siguiente comando:
```
docker-compose up
```

## Estructura del Proyecto
El proyecto se estructura en dos carpetas principales:
- `backend`: Contiene la lógica del servidor, incluyendo la carpeta `trailblaze` donde se encuentra la aplicación, así como archivos de configuración.
- `frontend`: Contiene archivos de configuración y la carpeta `src`, donde reside la aplicación frontend.

## Configuración
Los archivos de configuración más importantes son:
- `.env` en la carpeta `backend`: Este archivo contiene las variables de entorno necesarias para la configuración del backend.
- `secrets.js` en la carpeta `frontend`: Aquí se encuentran las credenciales que deben coincidir con las variables de entorno definidas en Docker Compose.

## Uso
Una vez que el proyecto esté en funcionamiento, puedes acceder a él a través de `localhost` en el puerto asignado a cada servicio.

## Contacto
- Guillem 
- Kevin

## Estado del Proyecto
Finalizado