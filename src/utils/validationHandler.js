import { validationResult, matchedData } from 'express-validator'

const validateResults = (req, res, next) => {
  try {
    validationResult(req).throw()
    req = matchedData(req)
    next()
  } catch (error) {
    res.status(422).send({ status: '422', message: error.array().map(err => err.msg).join(', ') })
  }
}

export { validateResults }
