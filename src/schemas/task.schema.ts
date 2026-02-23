import { z } from 'zod'
import { id } from 'zod/v4/locales'

export const createTaskSchema = z.object({
  title: z.string().min(3),
  description: z.string().optional(),
  priority: z.enum(['LOW', 'MEDIUM', 'HIGH', 'URGENT']).optional(),
  dueDate: z.string().datetime().optional(),
  assignedToId: z.number().optional()
})

export const updateTaskSchema = z.object({
  title: z.string().min(3).optional(),
  description: z.string().optional(),
  status: z.enum(['OPEN', 'IN_PROGRESS', 'REVIEW', 'DONE', 'CANCELED']).optional(),
  priority: z.enum(['LOW', 'MEDIUM', 'HIGH', 'URGENT']).optional(),
  dueDate: z.string().datetime().optional(),
  assignedToId: z.number().optional()
})


export const getTaskSchema = z.object({
  id: z.string(),
})

export const deleteTaskSchema = z.object({
  id: z.string(),
})

export const getTasksByUserSchema = z.object({
  userId: z.string(),
})

export const updateStatusSchema = z.object({
  status: z.enum(['OPEN', 'IN_PROGRESS', 'REVIEW', 'DONE', 'CANCELED'])
})

export const createCommentSchema = z.object({ content: z.string().min(3) })