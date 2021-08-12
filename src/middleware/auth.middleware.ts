import express from 'express'
import jwt from 'jsonwebtoken'

export const verifyJWT = (req: express.Request, res: express.Response, next: express.NextFunction): void => {
  try {
    const authorizationHeader = (req.headers.authorization as unknown) as string
    const token = authorizationHeader.split(' ')[1]
    // @ts-ignore
    jwt.verify(token, process.env.TOKEN_SECRET)

    next()
  } catch (error) {
    res.status(401)
    res.json('Access denied, invalid token')
    return
  }
}