import express from 'express'
import * as sessionController from '../controller/session.js'
import * as authController from '../controller/auth.js'
import authMiddleware from '../middleware/auth.js'
import { checkStudent, checkDean } from '../middleware/role.js'
const router = express.Router()

router.get('/', (req, res) => {
  res.send('Hello World!')
})

router.post('/login', authController.userLogin)
router.get(
  '/student/free-sessions',
  authMiddleware,
  checkStudent,
  sessionController.checkFreeSessions
)
router.post('/student/book-session', authMiddleware, checkStudent, sessionController.bookSession)

router.get(
  '/dean/pending-sessions',
  authMiddleware,
  checkDean,
  sessionController.checkPendingSessions
)

export default router
