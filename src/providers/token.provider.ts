import jwt from 'jsonwebtoken'
import { randomUUID } from 'crypto'

export function generateAccessToken(userId: number) {
  return jwt.sign(
    { sub: userId },
    process.env.JWT_SECRET!,
    { expiresIn: '15m' }
  )
}

export function generateRefreshToken() {
  return randomUUID()
}