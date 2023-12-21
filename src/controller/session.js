import Session from '../model/Session.js'
import Student from '../model/Student.js'
import Dean from '../model/Dean.js'
import CONST from '../utils/constants.js'
import { generateAvailableSessions, groupSessionsByDate } from '../service/session.js'

export const checkFreeSessions = async (req, res) => {
  try {
    const bookedSessions = await Session.find(
      { date: { $gte: Date.now() } },
      { _id: 0, dean: 1, date: { $dateToString: { format: '%Y-%m-%d', date: '$date' } } }
    )
    const groupedSessions = groupSessionsByDate(bookedSessions)

    const deans = await Dean.find({}, { _id: 1 })

    const availableSessions = generateAvailableSessions(groupedSessions, deans)

    res.json({ success: true, data: availableSessions })
  } catch (error) {
    console.error(error)
    res.status(500).json({ success: false, message: 'Failed to fetch free sessions' })
  }
}

export const bookSession = async (req, res) => {
  try {
    const { deanId } = req.body
    const date = new Date(req.body.date)
    const sessionDateTime = new Date(date).setHours(CONST.DEFAULT_SESSION_START_HOURS, 0, 0, 0)

    const currentDate = new Date()
    const advanceBookingDate = new Date(currentDate)
    advanceBookingDate.setDate(currentDate.getDate() + CONST.ADVANCE_BOOKING_DAYS)

    if ((date.getDay() !== 4 && date.getDay() !== 5) || date > advanceBookingDate) {
      return res.status(400).json({ success: false, message: 'Booking Unavailable' })
    }

    const session = await Session.findOne({ date: sessionDateTime, dean: deanId }, { _id: 1 })

    if (session) {
      return res.status(400).json({ success: false, message: 'This Session is already booked' })
    }

    const student = await Student.findOne({ universityId: req.user.universityId }, { _id: 1 })
    const booking = new Session({ date: sessionDateTime, dean: deanId, student: student._id })
    const bookedSession = await booking.save()

    res.json({ success: true, message: 'Session booked successfully', data: bookedSession })
  } catch (error) {
    console.error(error)
    res.status(500).json({ success: false, message: 'Failed to book session' })
  }
}

export const checkPendingSessions = async (req, res) => {
  try {
    const dean = await Dean.findOne({ universityId: req.user.universityId }, { _id: 1 })
    const pendingSessions = await Session.find(
      { dean: dean._id, date: { $gte: Date.now() } },
      { _id: 0, date: 1 }
    ).populate('student')

    res.json({ success: true, data: pendingSessions })
  } catch (error) {
    console.error(error)
    res.status(500).json({ success: false, message: 'Failed to fetch pending sessions' })
  }
}
