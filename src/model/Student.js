import mongoose from 'mongoose'

const studentSchema = new mongoose.Schema({
  universityId: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  branch: {
    type: String,
    required: true,
  },
  year: {
    type: Number,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  cgpa: {
    type: String,
  },
  address: {
    type: String,
  },
})

const Student = mongoose.model('Student', studentSchema)

export default Student
