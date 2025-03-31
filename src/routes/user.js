import { Router } from 'express'
import {
  registerUserController,
  verifyUserController,
  loginUserController,
  updateUserProfileController,
  updateUserCompanyController,
  updateUserLogoController,
  getUserDetailsController,
  deleteUserController,
  recoverPasswordController,
  inviteUserController,
  updatePasswordController
} from '../controllers/user.js'
import {
  validateRegister,
  validateVerification,
  validateLogin,
  validateUpdateRegistration,
  validateUpdateCompany,
  validateResetPassword,
  validateUserInvite,
  validateUpdatePassword
} from '../validators/user.js'
import { authMiddleware } from '../middlewares/authMiddleware.js'

const userRouter = Router()

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: API para la gestión de usuarios
 */

/**
 * @swagger
 * /register:
 *   post:
 *     summary: Registrar un nuevo usuario
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: Usuario registrado exitosamente
 *       400:
 *         description: Error de validación
 */

userRouter.post('/register', validateRegister, registerUserController)

/**
 * @swagger
 * /verify:
 *   put:
 *     summary: Verificar un usuario
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Usuario verificado exitosamente
 *       401:
 *         description: No autorizado
 */

userRouter.put('/verify', authMiddleware(), validateVerification, verifyUserController)

/**
 * @swagger
 * /login:
 *   post:
 *     summary: Iniciar sesión
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Inicio de sesión exitoso
 *       401:
 *         description: Credenciales inválidas
 */

userRouter.post('/login', validateLogin, loginUserController)

/**
 * @swagger
 * /register:
 *   patch:
 *     summary: Actualizar el perfil del usuario
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *     responses:
 *       200:
 *         description: Perfil actualizado exitosamente
 *       400:
 *         description: Error de validación
 */

userRouter.patch('/register', authMiddleware(), validateUpdateRegistration, updateUserProfileController)

/**
 * @swagger
 * /company:
 *   patch:
 *     summary: Actualizar la información de la empresa del usuario
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               companyName:
 *                 type: string
 *               companyAddress:
 *                 type: string
 *     responses:
 *       200:
 *         description: Información de la empresa actualizada exitosamente
 *       400:
 *         description: Error de validación
 */

userRouter.patch('/company', authMiddleware(), validateUpdateCompany, updateUserCompanyController)

/**
 * @swagger
 * /logo:
 *   patch:
 *     summary: Actualizar el logo del usuario
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               logo:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Logo actualizado exitosamente
 *       400:
 *         description: Error de validación
 */

userRouter.patch('/logo', authMiddleware(), updateUserLogoController)

/**
 * @swagger
 * /:
 *   get:
 *     summary: Obtener detalles del usuario
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Detalles del usuario obtenidos exitosamente
 *       401:
 *         description: No autorizado
 */

userRouter.get('/', authMiddleware(), getUserDetailsController)

/**
 * @swagger
 * /:
 *   delete:
 *     summary: Eliminar el usuario
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Usuario eliminado exitosamente
 *       401:
 *         description: No autorizado
 */

userRouter.delete('/', authMiddleware(), deleteUserController)

/**
 * @swagger
 * /recover-password:
 *   post:
 *     summary: Recuperar contraseña
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *     responses:
 *       200:
 *         description: Correo de recuperación enviado
 *       400:
 *         description: Error de validación
 */

userRouter.post('/recover-password', validateResetPassword, recoverPasswordController)

/**
 * @swagger
 * /password:
 *   put:
 *     summary: Actualizar la contraseña del usuario
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               code:
 *                 type: string
 *     responses:
 *       200:
 *         description: Contraseña actualizada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                 data:
 *                   type: object
 *                   properties:
 *                     user:
 *                       type: object
 *                       properties:
 *                         email:
 *                           type: string
 *                         role:
 *                           type: string
 *                         _id:
 *                           type: string
 *                     token:
 *                       type: string
 *       400:
 *         description: Error de validación
 *       500:
 *         description: Error interno del servidor
 */

userRouter.put('/password', validateUpdatePassword, updatePasswordController)

/**
 * @swagger
 * /invite:
 *   post:
 *     summary: Invitar a un nuevo usuario
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *     responses:
 *       200:
 *         description: Invitación enviada exitosamente
 *       400:
 *         description: Error de validación
 */

userRouter.post('/invite', authMiddleware(), validateUserInvite, inviteUserController)

export { userRouter }
