import express from 'express'
import router from './src/routes/index.js'
import CONST from './src/utils/constants.js'
import connectDB from './src/db/database.js'

const app = express()
const PORT = process.env.PORT || CONST.DEFAULT_PORT

connectDB()

app.use(express.json())
app.use('/', router)

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`)
})
