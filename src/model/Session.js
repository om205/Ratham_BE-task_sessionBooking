import mongoose from 'mongoose'
import CONST from '../utils/constants.js'

const sessionSchema = new mongoose.Schema({
  date: {
    type: Date,
    required: true,
  },
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Student',
    required: true,
  },
  dean: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Dean',
    required: true,
  },
  //   status: {
  //     type: String,
  //     enum: CONST.SESSION_STATUS_ENUM,
  //     default: CONST.SESSION_STATUS_ENUM[0],
  //   },
})

const Session = mongoose.model('Session', sessionSchema)

export default Session
