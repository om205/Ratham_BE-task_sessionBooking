import CONST from '../utils/constants.js'
import jwt from 'jsonwebtoken'

const JWT_SECRET_KEY = process.env.JWT_SECRET || CONST.TEMP_JWT_SECRET_KEY

export const generateJWT = payload => {
  return jwt.sign(payload, JWT_SECRET_KEY, {
    expiresIn: CONST.JWT_EXPIRY,
  })
}
export const pad = num => (num < 10 ? '0' + num : num)

export const formatDate = date => {
  const d = new Date(date)
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`
}
