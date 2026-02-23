import express from 'express'
import dotenv from 'dotenv'
import { tasksRoutes } from './routes/tasks.routes'
import { errorHandler } from './middlewares/errorHandler'
import { authMiddleware } from './middlewares/auth.middleware'
import { authRoutes } from './routes/auth.routes'

dotenv.config()

const app = express()
app.use(express.json())


app.use('/auth', authRoutes)
app.use('/tasks', authMiddleware, tasksRoutes)

app.use(errorHandler)

app.listen(3000, () => {
  console.log('API running on port 3000')
})
