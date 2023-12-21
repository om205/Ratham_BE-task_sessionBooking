import mongoose from 'mongoose'

const deanSchema = new mongoose.Schema({
  universityId: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  department: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
})

const Dean = mongoose.model('Dean', deanSchema)

export default Dean
