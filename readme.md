# Proyecto P1

Este proyecto es una aplicación web desarrollada como parte de un curso universitario. Su objetivo es demostrar conceptos clave de desarrollo web.

## Requisitos

- Node.js (versión 20 o superior)
- npm

## Instalación

1. Clona este repositorio:
   ```bash
   git clone https://github.com/nestorvillap/p1.git
   ```
2. Navega al directorio del proyecto:
   ```bash
   cd p1
   ```
3. Instala las dependencias:
   ```bash
   npm install
   ```
4. Rellena el .env con tus claves:
   ```bash
   cp .env.example .env
   ```

## Uso

Para iniciar el servidor de desarrollo, ejecuta:
```bash
npm run dev
```

Luego, abre tu navegador en `http://localhost:3000` o el puerto que hayas especificado en el .env .


## Curiosidades del proyecto

Se usa un Linter, 'ESLINT', con las reglas standard

No se usa commonjs, se usa ecms modules

Para enviar emails se usa resend

Para el almacenamiento se usa un bucket de scaleway, que funciona con el mismo sdk de aws, y ofrece 75 GB gratis para siempre sin limites de requests

Estructura mvc, con services para separar la logica de los controladores

No se usa nodemon, node tiene `node --watch server.js` de forma nativa, ya no es necesario nodemon

No se usa dotenv, node tiene `node --env-file .env` de forma nativa, ya no es necesario dotenv

Solo se usa process.env una vez en el config.js ya que esta llamada de node es bastante pesada hay que envitar llamarlo mas de una vez