import * as utils from '../utils/helper.js'
import CONST from '../utils/constants.js'

/**
 * Generate available sessions for Thursdays and Friday within the next N days.
 *
 * @param {Array<Object>} bookedSessions - Array of booked sessions containing properties 'date'(yyyy-mm-dd) and 'deans'(array of available deans).
 * @param {Array<Object>} deans - Array of deans with an _id property.
 * @returns {Array<Object>} - Array of available session with dates in the format 'yyyy-mm-dd' and availabelDeans as an array of _id's.
 */
export const generateAvailableSessions = (bookedSessions, deans) => {
  const availableSessions = []
  const daysInFuture = CONST.ADVANCE_BOOKING_DAYS

  const currentDate = new Date()

  // Loop through the next N days
  for (let day = 0; day < daysInFuture; day++) {
    const date = new Date(currentDate)
    date.setDate(currentDate.getDate() + day)

    // Check if the date is a Thursday or Friday
    if (date.getDay() === 4 || date.getDay() === 5) {
      // Format the date as 'yyyy-mm-dd'
      const formattedDate = utils.formatDate(date)
      const unavailableDeans = bookedSessions.find(
        session => utils.formatDate(session.date) === formattedDate
      )?.deans
      const availableDeans = deans
        .filter(dean => !unavailableDeans?.includes(dean._id.toString()))
        .map(dean => dean._id.toString())
      availableSessions.push({ date: formattedDate, availableDeans })
    }
  }

  return availableSessions
}

/**
 *
 * @param {Array<Object>} sessions - Array of sessions with a 'date' and 'dean' property.
 * @returns - Array of sessions grouped by date containing properties 'date'(yyyy-mm-dd) and 'deans'(array of available deans).
 */
export const groupSessionsByDate = sessions => {
  const groupedSessions = sessions.reduce((groupedSessions, { date, dean: deanId }) => {
    const existingEntry = groupedSessions.find(entry => entry.date === date)

    if (existingEntry) {
      existingEntry.deanIds.push(deanId)
    } else {
      groupedSessions.push({ date, deanIds: [deanId] })
    }

    return groupedSessions
  }, [])
  //   .map(({ date, deanIds }) => ({ date: utils.formatDate(date), deanIds }))

  return groupedSessions
}
