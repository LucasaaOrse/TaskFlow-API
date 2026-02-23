import { Request, Response } from 'express'
import { registerSchema, loginSchema } from '../schemas/auth.schema'
import { registerUser, loginUser, refreshAccessToken } from '../services/auth.service'


export async function register(req: Request, res: Response) {
  const data = registerSchema.parse(req.body)
  const user = await registerUser(data.email, data.password)
  return res.status(201).json(user)
}

export async function login(req: Request, res: Response) {
  const data = loginSchema.parse(req.body)
  const result = await loginUser(data.email, data.password)
  return res.json(result)
}


export async function refresh(req: Request, res: Response) {
  const { refreshToken } = req.body

  const result = await refreshAccessToken(refreshToken)

  return res.json(result)
}