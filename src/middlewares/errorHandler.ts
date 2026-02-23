import { Request, Response, NextFunction } from 'express'
import { ZodError } from 'zod'
import { Prisma } from '@prisma/client'
import { AppError } from '../errors/AppError'

export function errorHandler(
  error: unknown,
  req: Request,
  res: Response,
  next: NextFunction
) {
  console.error(error)

  // Zod validation
  if (error instanceof ZodError) {
    return res.status(400).json({
      error: 'Validation error',
      issues: error.flatten().fieldErrors
    })
  }

  // Prisma known errors
  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    if (error.code === 'P2025') {
      return res.status(404).json({
        error: 'Resource not found'
      })
    }

    return res.status(400).json({
      error: 'Database error',
      code: error.code
    })
  }

  // Custom app error
  if (error instanceof AppError) {
    return res.status(error.statusCode).json({
      error: error.message,
      details: error.details
    })
  }

  // Unknown error
  return res.status(500).json({
    error: 'Internal server error'
  })
}
