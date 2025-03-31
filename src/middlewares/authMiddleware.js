import jwt from 'jsonwebtoken'
import { JWT_SECRET } from '../config/config.js'

// Ejemplo de uso: app.use('/api/test', authMiddleware(), testRouter) // Ruta protegida para cualquier usuario
// Ejemplo de uso: app.use('/api/test', authMiddleware(['admin']), testRouter) // Ruta protegida solo pueden los administradores
// Ejemplo de uso: app.use('/api/test', authMiddleware(['admin', 'manager']), testRouter) // Ruta protegida solo pueden los administradores y gestores

const authMiddleware = (roles = []) => {
  return (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1]

    if (!token) {
      return res.status(401).send({ status: 401, message: 'authorization token required' })
    }

    const decoded = verifyToken(token)

    if (!decoded) {
      return res.status(403).send({ status: 403, message: 'invalid token' })
    }

    req.user = decoded.user

    if (roles.length && !roles.includes(req.user.role)) {
      return res.status(403).send({ status: 403, message: 'forbidden, insufficient permissions' })
    }
    next()
  }
}

const verifyToken = (token) => {
  try {
    return jwt.verify(token, JWT_SECRET)
  } catch (error) {
    return null
  }
}

export { authMiddleware }
