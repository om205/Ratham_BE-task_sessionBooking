import CONST from '../utils/constants.js'

const checkRole = role => {
  return (req, res, next) => {
    if (req.user && req.user.role === role) {
      next()
    } else {
      res.status(403).send({
        success: false,
        message: 'Access denied. You do not have the required permission.',
      })
    }
  }
}

export const checkStudent = checkRole(CONST.USER_ROLE_ENUM[0])
export const checkDean = checkRole(CONST.USER_ROLE_ENUM[1])
