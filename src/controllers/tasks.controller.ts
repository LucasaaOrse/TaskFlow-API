import { Request, Response } from 'express'
import { createTaskService, listTasksService, getTaskService, updateTaskService, deleteTaskService, getTasksByUserService, getTasksAssignedToMeService, updateTaskStatusService, createCommentService, listCommentsService } from '../services/tasks.service'
import { createTaskSchema, getTaskSchema, deleteTaskSchema, getTasksByUserSchema, updateTaskSchema, updateStatusSchema, createCommentSchema } from '../schemas/task.schema'
export async function createTask(req: Request, res: Response) {
  const parsed = createTaskSchema.safeParse(req.body)

  if (!parsed.success) {
    return res.status(400).json({
      error: parsed.error.flatten()
    })
  }

  const userId = req.userId
  if (!userId) {
    return res.status(401).json({ error: 'Unauthorized' })
  }

  const task = await createTaskService({
    ...parsed.data,
    userId
  })

  return res.status(201).json(task)
}

export async function listTasks(req: Request, res: Response) {

  const userId = req.userId

 if(!userId)
  return res.status(401).json({ error: 'Unauthorized' })



  const tasks = await listTasksService(userId)
  return res.json(tasks)
}


export async function getTask(req: Request, res: Response) {
  const parsed = getTaskSchema.safeParse(req.params)

  if (!parsed.success) {
    return res.status(400).json({
      error: parsed.error.flatten()
    })
  }

  const task = await getTaskService(Number(parsed.data.id), req.userId!)
  return res.json(task)
}

export async function updateTask(req: Request, res: Response) {
  const params = getTaskSchema.safeParse(req.params)
  const body = updateTaskSchema.safeParse(req.body)

  if (!params.success || !body.success) {
    return res.status(400).json({ error: 'Invalid data' })
  }

  const userId = req.userId
  if (!userId) {
    return res.status(401).json({ error: 'Unauthorized' })
  }

  const task = await updateTaskService(
    Number(params.data.id),
    body.data,
    userId
  )

  return res.json(task)
}


export async function deleteTask(req: Request, res: Response) {
  const parsed = deleteTaskSchema.safeParse(req.params)
  const userId = req.userId

  if (!parsed.success) {
    return res.status(400).json({
      error: parsed.error.flatten()
    })
  }

  if(!userId){
    return res.status(401).json({ error: 'Unauthorized' })
  }

  const { id } = parsed.data
  await deleteTaskService(Number(id), userId)
  return res.sendStatus(204)
}

export async function getTasksByUser(req: Request, res: Response) {
  const parsed = getTasksByUserSchema.safeParse(req.params)

  if (!parsed.success) {
    return res.status(400).json({
      error: parsed.error.flatten()
    })
  }

  const tasks = await getTasksByUserService(Number(parsed.data.userId))

  return res.json(tasks)
}

export async function getTasksAssignedToMe(req: Request, res: Response) {
  const userId = req.userId

  if (!userId) {
    return res.status(401).json({ error: 'Unauthorized' })
  }

  const tasks = await getTasksAssignedToMeService(userId)

  return res.json(tasks)
}

export async function updateTaskStatus(req: Request, res: Response) {
  const parsed = updateStatusSchema.safeParse(req.body)

  if (!parsed.success) {
    return res.status(400).json({
      error: parsed.error.flatten()
    })
  }

  const { id } = req.params
  const { status } = req.body
  const userId = req.userId

  if (!userId) {
    return res.status(401).json({ error: 'Unauthorized' })
  }

  const task = await updateTaskStatusService(Number(id), status)

  return res.json(task)
}

export async function createComment(req: Request, res: Response) {
  const parsed = createCommentSchema.safeParse(req.body)

  if (!parsed.success) {
    return res.status(400).json({
      error: parsed.error.flatten()
    })
  }

  const { id } = req.params
  const { content } = parsed.data
  const userId = req.userId

  if (!userId) {
    return res.status(401).json({ error: 'Unauthorized' })
  }

  const task = await createCommentService(Number(id), content, userId)

  return res.json(task)

}

export async function listComments(req: Request, res: Response) {
  const { id } = req.params

  const comments = await listCommentsService(Number(id))

  return res.json(comments)
}