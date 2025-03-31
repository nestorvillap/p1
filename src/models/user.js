import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['admin', 'user'], default: 'user' },
  name: { type: String },
  surnames: { type: String },
  nif: { type: String },
  company: {
    name: { type: String },
    cif: { type: String },
    street: { type: String },
    number: { type: Number },
    postal: { type: Number },
    city: { type: String },
    province: { type: String }
  },
  logo: { type: String },
  deleted: { type: Boolean, default: false },
  resetPasswordToken: { type: String },
  maxAttempts: { type: Number, default: 3 },
  verified: { type: Boolean, default: false },
  verificationCode: { type: Number },
  resetPasswordCode: { type: Number }
})

// Hash de la contraseña antes de guardar
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) { return next() }

  const salt = await bcrypt.genSalt(10)
  this.password = await bcrypt.hash(this.password, salt)
  next()
})

// Generar un código aleatorio de 6 dígitos
userSchema.methods.generateValidationCode = function () {
  const code = Math.floor(100000 + Math.random() * 900000) // Genera un número entre 100000 y 999999
  this.verificationCode = code
  this.save()
  return code
}

// Generar un código aleatorio de 6 dígitos para restablecer la contraseña
userSchema.methods.generateResetPasswordCode = function () {
  const code = Math.floor(100000 + Math.random() * 900000) // Genera un número entre 100000 y 999999
  this.resetPasswordCode = code
  this.save()
  return code
}

// Método para comparar contraseñas
userSchema.methods.comparePassword = function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password)
}

export const User = mongoose.model('User', userSchema)
