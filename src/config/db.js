import mongoose from 'mongoose'
import { DB_URI } from './config.js'

const clientOptions = { }

const connectDB = async () => {
  try {
    await mongoose.connect(DB_URI, clientOptions)
    console.log('✅ Conectado a la base de datos')
  } catch (error) {
    console.error('❌ Error conectando a la base de datos:', error)
    throw error
  }
}

export { connectDB }
