import { prisma } from '../db/prisma'
import bcrypt from 'bcryptjs'

import { AppError } from '../errors/AppError'
import { generateAccessToken, generateRefreshToken } from '../providers/token.provider'


export async function registerUser(email: string, password: string) {
  const exists = await prisma.user.findUnique({ where: { email } })
  if (exists) throw new AppError('Email already registered', 409)

  const hash = await bcrypt.hash(password, 10)

  const user = await prisma.user.create({
    data: { email, password: hash }
  })

  return user
}

export async function refreshAccessToken(refreshToken: string) {
  const stored = await prisma.refreshToken.findUnique({
    where: { token: refreshToken }
  })

  if (!stored || stored.expiresAt < new Date()) {
    throw new AppError('Invalid refresh token', 401)
  }

  const newAccessToken = generateAccessToken(stored.userId)

  return {
    accessToken: newAccessToken
  }
}

export async function loginUser(email: string, password: string) {
  const user = await prisma.user.findUnique({ where: { email } })

  if (!user) throw new AppError('Invalid credentials', 401)

  const valid = await bcrypt.compare(password, user.password)
  if (!valid) throw new AppError('Invalid credentials', 401)

  const accessToken = generateAccessToken(user.id)
  const refreshToken = generateRefreshToken()

  await prisma.refreshToken.create({
    data: {
      token: refreshToken,
      userId: user.id,
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
    }
  })

  return {
    accessToken,
    refreshToken
  }
}