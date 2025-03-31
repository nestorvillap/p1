import { check } from 'express-validator'
import { validateResults } from '../utils/validationHandler.js'

const validateRegister = [
  check('email').isEmail().withMessage('Invalid email format'),
  check('password')
    .isLength({ min: 8 })
    .withMessage('Password must be at least 8 characters long'),
  (req, res, next) => validateResults(req, res, next)
]

const validateVerification = [
  check('code')
    .isLength({ min: 6, max: 6 })
    .withMessage('Verification code must be 6 digits long')
    .isNumeric()
    .withMessage('Verification code must be numeric'),
  (req, res, next) => validateResults(req, res, next)
]

const validateLogin = [
  check('email').isEmail().withMessage('Invalid email format'),
  check('password')
    .isLength({ min: 8 })
    .withMessage('Password must be at least 8 characters long'),
  (req, res, next) => validateResults(req, res, next)
]

const validateUpdateRegistration = [
  check('name').notEmpty().withMessage('Name is required'),
  check('surnames').notEmpty().withMessage('Surnames are required'),
  check('nif').notEmpty().withMessage('NIF is required'),
  (req, res, next) => validateResults(req, res, next)
]

const validateUpdateCompany = [
  check('company.name').notEmpty().withMessage('Company name is required'),
  check('company.cif').notEmpty().withMessage('Company CIF is required'),
  check('company.street').notEmpty().withMessage('Street is required'),
  check('company.number').isNumeric().withMessage('Number must be numeric'),
  check('company.postal').isNumeric().withMessage('Postal code must be numeric'),
  check('company.city').notEmpty().withMessage('City is required'),
  check('company.province').notEmpty().withMessage('Province is required'),
  (req, res, next) => validateResults(req, res, next)
]

const validateResetPassword = [
  check('email').isEmail().withMessage('Invalid email format'),
  (req, res, next) => validateResults(req, res, next)
]

const validateUserInvite = [
  check('email').isEmail().withMessage('Invalid email format'),
  (req, res, next) => validateResults(req, res, next)
]

const validateUpdatePassword = [
  check('email').isEmail().withMessage('Invalid email format'),
  check('password')
    .isLength({ min: 8 })
    .withMessage('Password must be at least 8 characters long'),
  check('code')
    .isLength({ min: 6, max: 6 })
    .withMessage('Verification code must be 6 digits long')
    .isNumeric()
    .withMessage('Verification code must be numeric'),
  (req, res, next) => validateResults(req, res, next)
]

export { validateRegister, validateVerification, validateLogin, validateUpdateRegistration, validateUpdateCompany, validateResetPassword, validateUserInvite, validateUpdatePassword }
