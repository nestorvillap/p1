// Imports
import express from 'express'
import cors from 'cors'
import { userRouter } from './routes/user.js'

const app = express()

// Middlewares
app.use(cors())
app.use(express.json())

// Rutas
app.use('/api/user', userRouter)
app.use('/', (req, res) => res.send('API funcionando'))

export { app }
