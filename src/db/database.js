import mongoose from 'mongoose'
import CONST from '../utils/constants.js'

const mongoURL = process.env.MONGO_URL || CONST.DEFAULT_MONGO_URL

const connect = async () => {
  try {
    await mongoose.connect(mongoURL)
    console.log('MongoDB Connection Established')
  } catch (error) {
    console.log('MongoDB Connection Error\n\n', error)
  }
}

export default connect
