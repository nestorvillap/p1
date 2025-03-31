import { User } from '../models/user.js'
import { JWT_SECRET } from '../config/config.js'
import { uploadImageToS3 } from '../utils/s3Handler.js'
import { sendEmail } from '../utils/resendHandler.js'
import jwt from 'jsonwebtoken'
import fs from 'fs'

export async function createUserAccount ({ email, password }) {
  const user = await User.create({ password, email })
  user.generateValidationCode()

  sendEmail({
    to: user.email,
    subject: 'Verificación de Correo Electrónico',
    html: `<p>¡Bienvenido! Usa el siguiente código para verificar tu correo electrónico: <strong>${user.verificationCode}</strong></p>`
  })

  const token = jwt.sign({ user }, JWT_SECRET, { expiresIn: '1h' })
  return { user, token }
}

export async function confirmUserVerification ({ email, code }) {
  const user = await User.findOne({ email })
  if (!user) throw new Error('user not found')
  if (user.verified) throw new Error('user already verified')
  if (String(user.verificationCode) !== String(code)) throw new Error('invalid verification code')

  user.verified = true
  await user.save()

  const token = jwt.sign({ user }, JWT_SECRET, { expiresIn: '1h' })
  return { user, token }
}

export async function updatePassword ({ email, password, code }) {
  const user = await User.findOne({ email })
  if (!user) throw new Error('user not found')
  if (user.verificationCode === 0) throw new Error('you need to generate a recover code first')
  if (!password) throw new Error('password is required')
  if (String(user.resetPasswordCode) !== String(code)) throw new Error('invalid verification code')

  user.password = password
  user.verificationCode = 0
  await user.save()

  const token = jwt.sign({ user }, JWT_SECRET, { expiresIn: '1h' })

  return { user, token }
}

export async function authenticateUser ({ email, password }) {
  const user = await User.findOne({ email })
  if (!user) throw new Error('user not found')
  if (!user.verified) throw new Error('user not verified')

  const isMatch = await user.comparePassword(password)
  if (!isMatch) throw new Error('wrong password')

  const token = jwt.sign({ user }, JWT_SECRET, { expiresIn: '1h' })
  return { user, token }
}

export async function modifyUserProfile ({ userId, data }) {
  const user = await User.findByIdAndUpdate(userId, data, { new: true })
  if (!user) throw new Error('User not found')
  return { user }
}

export async function modifyUserCompanyDetails ({ userId, company }) {
  const user = await User.findByIdAndUpdate(userId, { company }, { new: true })
  if (!user) throw new Error('User not found')
  return { user }
}

export async function uploadUserLogo ({ userId, file }) {
  const fileContent = await fs.promises.readFile(file.filepath)
  const logoUrl = await uploadImageToS3(fileContent, file.mimetype)
  const user = await User.findByIdAndUpdate(userId, { logo: logoUrl }, { new: true })
  if (!user) throw new Error('User not found')
  return { user }
}

export async function fetchUserDetails ({ userId }) {
  const user = await User.findById(userId)
  if (!user) throw new Error('User not found')
  return { user }
}

export async function removeUserAccount ({ userId, soft }) {
  const user = await User.findById(userId)
  if (!user) throw new Error('User not found')

  if (soft === 'false') {
    await User.findByIdAndDelete(userId)
  } else {
    user.deleted = true
    await user.save()
  }
}

export async function initiatePasswordRecovery ({ email }) {
  const user = await User.findOne({ email })
  if (!user) throw new Error('User not found')

  user.generateResetPasswordCode()
  await user.save()

  // Despues con ese codigo puede hacer un update password
  sendEmail({
    to: user.email,
    subject: 'Recuperación de Contraseña',
    html: `<p>Usa el siguiente código para recuperar tu contraseña: <strong>${user.verificationCode}</strong></p>`
  })

  return { user }
}

export async function sendUserInvitation ({ email, inviterId }) {
  const inviter = await User.findById(inviterId)

  if (!inviter) throw new Error('user not found')
  if (!inviter.company) throw new Error('User cannot send invitations because they are not associated with any company')

  const password = ''
  const newUser = await User.create({ email, password, role: 'guest', company: inviter.company })
  newUser.generateValidationCode()

  sendEmail({
    to: email,
    subject: 'Invitación a la Plataforma',
    html: `<p>${inviter.name} te ha invitado a unirte a la plataforma. Usa el siguiente codigo para completar el registro: ${newUser.verificationCode} </p>`
  })

  return newUser
}
