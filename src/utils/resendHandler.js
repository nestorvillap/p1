import { Resend } from 'resend'
import { RESEND_API_KEY } from '../config/config.js'

const resend = new Resend(RESEND_API_KEY)

export function sendEmail ({ from, to, subject, html }) {
  return resend.emails.send({
    from: `${from}.nest0r.dev`,
    to,
    subject,
    html
  })
}
