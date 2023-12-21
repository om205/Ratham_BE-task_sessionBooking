import * as utils from '../utils/helper.js'
import User from '../model/User.js'
import bcrypt from 'bcrypt'

export const userLogin = async (req, res) => {
  try {
    const { universityId, password } = req.body

    const user = await User.findOne({ universityId })

    if (user && (await bcrypt.compare(password, user.password))) {
      const token = utils.generateJWT({
        universityId: user.universityId,
        role: user.role,
      })

      res.json({ success: true, token, role: user.role })
    } else {
      res.status(401).json({ success: false, message: 'Invalid credentials' })
    }
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Internal Server Error' })
  }
}
