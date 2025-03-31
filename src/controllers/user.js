import {
  createUserAccount,
  confirmUserVerification,
  authenticateUser,
  modifyUserProfile,
  modifyUserCompanyDetails,
  uploadUserLogo,
  fetchUserDetails,
  removeUserAccount,
  initiatePasswordRecovery,
  sendUserInvitation,
  updatePassword
} from '../services/user.js'
import formidable from 'formidable'

export async function registerUserController (req, res) {
  const { email, password } = req.body
  try {
    const { user, token } = await createUserAccount({ email, password })
    res.status(201).send({ status: 201, data: { user: { email: user.email, verified: user.verified, role: user.role, _id: user._id }, token } })
  } catch (error) {
    res.status(409).send({ status: 409, message: 'email already register' })
  }
}

export async function verifyUserController (req, res) {
  const { code, password } = req.body
  try {
    const { user, token } = await confirmUserVerification({ email: req.user.email, code, password })
    res.status(200).send({ status: 200, data: { user: { email: user.email, verified: user.verified, role: user.role, _id: user._id }, token } })
  } catch (error) {
    res.status(400).send({ status: 400, message: error.message })
  }
}

export async function loginUserController (req, res) {
  const { email, password } = req.body
  try {
    const { user, token } = await authenticateUser({ email, password })
    res.status(200).send({ status: 200, data: { user: { email: user.email, role: user.role, _id: user._id }, token } })
  } catch (error) {
    res.status(400).send({ status: 400, message: error.message })
  }
}

export async function updateUserProfileController (req, res) {
  try {
    const { user } = await modifyUserProfile({ userId: req.user._id, data: req.body })
    res.status(200).send({ status: 200, data: { user: { email: user.email, name: user.name, surnames: user.surnames, nif: user.nif } } })
  } catch (error) {
    res.status(400).send({ status: 400, message: error.message })
  }
}

export async function updateUserCompanyController (req, res) {
  try {
    const { user } = await modifyUserCompanyDetails({ userId: req.user._id, company: req.body.company })
    res.status(200).send({
      status: 200,
      data: {
        company: {
          name: user.company.name,
          cif: user.company.cif,
          street: user.company.street,
          number: user.company.number,
          postal: user.company.postal,
          city: user.company.city,
          province: user.company.province
        }
      }
    })
  } catch (error) {
    res.status(400).send({ status: 400, message: error.message })
  }
}

export async function updateUserLogoController (req, res) {
  const form = formidable({})
  form.parse(req, async (err, fields, files) => {
    if (err) {
      return res.status(400).send({ status: 400, message: 'Error parsing the file' })
    }
    try {
      const { user } = await uploadUserLogo({ userId: req.user._id, file: files.image[0] })
      res.status(200).send({ status: 200, data: { logo: user.logo } })
    } catch (error) {
      res.status(400).send({ status: 400, message: error.message })
    }
  })
}

export async function getUserDetailsController (req, res) {
  try {
    const { user } = await fetchUserDetails({ userId: req.user._id })
    res.status(200).send({
      status: 200,
      data: {
        user: {
          email: user.email,
          name: user.name,
          surnames: user.surnames,
          nif: user.nif,
          company: user.company,
          logo: user.logo
        }
      }
    })
  } catch (error) {
    res.status(500).send({ status: 500, message: error.message })
  }
}

export async function deleteUserController (req, res) {
  const { soft } = req.query
  try {
    await removeUserAccount({ userId: req.user._id, soft })
    res.status(200).send({ status: 200 })
  } catch (error) {
    res.status(500).send({ status: 500, message: error.message })
  }
}

export async function recoverPasswordController (req, res) {
  const { email } = req.body
  try {
    await initiatePasswordRecovery({ email })
    res.status(200).send({ status: 200 })
  } catch (error) {
    res.status(500).send({ status: 500, message: error.message })
  }
}

export async function inviteUserController (req, res) {
  const { email } = req.body
  try {
    const newUser = await sendUserInvitation({ email, inviterId: req.user._id })
    res.status(201).send({ status: 201, data: { user: { email: newUser.email, role: newUser.role, _id: newUser._id } } })
  } catch (error) {
    res.status(500).send({ status: 500, message: error.message })
  }
}

export async function updatePasswordController (req, res) {
  const { email, password, code } = req.body
  try {
    const { user, token } = await updatePassword({ email, password, code })
    res.status(201).send({ status: 201, data: { user: { email: user.email, role: user.role, _id: user._id }, token } })
  } catch (error) {
    res.status(500).send({ status: 500, message: error.message })
  }
}
