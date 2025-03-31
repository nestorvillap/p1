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
  inviteUserController
} from '../controllers/user.js'
import {
  validateRegister,
  validateVerification,
  validateLogin,
  validateUpdateRegistration,
  validateUpdateCompany,
  validateResetPassword,
  validateUserInvite
} from '../validators/user.js'
import { authMiddleware } from '../middlewares/authMiddleware.js'

const userRouter = Router()

userRouter.post('/register', validateRegister, registerUserController)
userRouter.put('/verify', authMiddleware(), validateVerification, verifyUserController)
userRouter.post('/login', validateLogin, loginUserController)
userRouter.patch('/register', authMiddleware(), validateUpdateRegistration, updateUserProfileController)
userRouter.patch('/company', authMiddleware(), validateUpdateCompany, updateUserCompanyController)
userRouter.patch('/logo', authMiddleware(), updateUserLogoController)
userRouter.get('/', authMiddleware(), getUserDetailsController)
userRouter.delete('/', authMiddleware(), deleteUserController)
userRouter.post('/recover-password', validateResetPassword, recoverPasswordController)
userRouter.post('/invite', authMiddleware(), validateUserInvite, inviteUserController)

export { userRouter }
