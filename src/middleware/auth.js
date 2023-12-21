import jwt from 'jsonwebtoken'
import CONST from '../utils/constants.js'

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY || CONST.TEMP_JWT_SECRET_KEY

const authMiddleware = (req, res, next) => {
  const authHeader = req.header('Authorization')
  const token = authHeader && authHeader.split(' ')[1]

  if (!token) {
    return res
      .status(401)
      .send({ success: false, message: 'Access denied. No token provided.' })
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET_KEY)
    req.user = decoded
    next()
  } catch (ex) {
    res.status(400).send({ success: false, message: 'Invalid auth token.' })
  }
}

export default authMiddleware
