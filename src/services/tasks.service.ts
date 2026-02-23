import { prisma } from '../db/prisma'
import { Status } from '@prisma/client'

type CreateTaskDTO = {
  title: string
  description?: string
  priority?: 'LOW' | 'MEDIUM' | 'HIGH' | 'URGENT'
  dueDate?: string
  assignedToId?: number
  userId: number
}

type UpdateTaskDTO = {
  title?: string
  description?: string
  status?: 'OPEN' | 'IN_PROGRESS' | 'REVIEW' | 'DONE' | 'CANCELED'
  priority?: 'LOW' | 'MEDIUM' | 'HIGH' | 'URGENT'
  dueDate?: string
  assignedToId?: number
}

export async function createTaskService(data: CreateTaskDTO) {
  return prisma.task.create({
    data: {
      title: data.title,
      description: data.description,
      priority: data.priority,
      dueDate: data.dueDate ? new Date(data.dueDate) : undefined,
      assignedToId: data.assignedToId,
      userId: data.userId
    }
  })
}

export async function listTasksService(userId: number) {
  return prisma.task.findMany({
    where: { userId },
    orderBy: { createdAt: 'desc' }
  })
}


export async function deleteTaskService(id: number, userId: number) {
  return prisma.task.delete({
    where: { id, userId }
  })
}

export async function updateTaskService(
  id: number,
  data: UpdateTaskDTO,
  userId: number
) {
  return prisma.task.updateMany({
    where: {
      id,
      userId
    },
    data: {
      ...data,
      dueDate: data.dueDate ? new Date(data.dueDate) : undefined
    }
  })
}


export async function getTaskService(id: number, userId: number) {
  return prisma.task.findFirst({
    where: {
      id,
      userId
    },
    include: {
      assignedTo: {
        select: { id: true, email: true }
      },
      comments: {
        include: {
          user: {
            select: { id: true, email: true }
          }
        }
      }
    }
  })
}

export async function getTasksByUserService(userId: number) {
  return prisma.task.findMany({
    where: { userId }
  })
}

export async function getTasksAssignedToMeService(userId: number) {
  return prisma.task.findMany({
    where: { assignedToId: userId }
  })
}

export async function updateTaskStatusService(id: number, status: Status) {
  return prisma.task.update({
  where: { id },
  data: { status }
})
}


export async function createCommentService(taskId: number, content: string, userId: number) {
  return prisma.comment.create({
    data: {
      content,
      taskId,
      userId
    }
  })
}


export async function listCommentsService(taskId: number) {
  return prisma.comment.findMany({
    where: { taskId },
    include: {
      user: {
        select: { id: true, email: true }
      }
    }
  })
}