import swaggerJSDoc from 'swagger-jsdoc'
import swaggerUi from 'swagger-ui-express'

// Opciones de configuración para Swagger
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API de P1',
      version: '1.0.0'
    }
  },
  apis: ['./src/routes/*.js'] // Ruta donde estarán documentadas las rutas
}

// Generar documentación con swagger-jsdoc
const swaggerDocs = swaggerJSDoc(swaggerOptions)

// Middleware para integrar Swagger en Express
export const swaggerMiddleware = (app) => {
  app.use('/', swaggerUi.serve, swaggerUi.setup(swaggerDocs))
}
