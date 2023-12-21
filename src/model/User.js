import mongoose from 'mongoose'
import CONST from '../utils/constants.js'

const UserSchema = new mongoose.Schema({
  universityId: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: CONST.USER_ROLE_ENUM,
    required: true,
  },
})

const User = mongoose.model('User', UserSchema)

export default User
