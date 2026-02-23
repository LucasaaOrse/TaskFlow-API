import { Router } from 'express'
import { createTask, listTasks, deleteTask, getTask, updateTask, getTasksByUser, getTasksAssignedToMe, updateTaskStatus, createComment, listComments } from '../controllers/tasks.controller'


export const tasksRoutes = Router()

tasksRoutes.post('/', createTask)
tasksRoutes.get('/', listTasks)

tasksRoutes.get('/assigned/me', getTasksAssignedToMe)
tasksRoutes.get('/user/:userId', getTasksByUser)

tasksRoutes.get('/:id/comments', listComments)
tasksRoutes.post('/:id/comments', createComment)
tasksRoutes.patch('/:id/status', updateTaskStatus)

tasksRoutes.get('/:id', getTask)
tasksRoutes.put('/:id', updateTask)
tasksRoutes.delete('/:id', deleteTask)
