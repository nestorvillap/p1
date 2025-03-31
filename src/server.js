// Imports
import { app } from './app.js'
import { PORT } from './config/config.js'
import { connectDB } from './config/db.js'

// Inicio del servidor
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`✅ Funcionando en puerto: ${PORT}`)
  })
}).catch(error => {
  console.error('❌ Error conectando a la base de datos:', error)
})
