import express from 'express'
import jwt from 'jsonwebtoken'

export const verifyJWT = (req: express.Request, res: express.Response, next: express.NextFunction): void => {
  try {
    const authorizationHeader = (req.headers.authorization as unknown) as string
    const token = authorizationHeader.split(' ')[1]
    const decodedAccessToken = jwt.decode(token) as jwt.JwtPayload
    const tokenSecret = process.env.TOKEN_SECRET as string
    req.body.userId = decodedAccessToken.user.id
    jwt.verify(token, tokenSecret)

    next()
  } catch (error) {
    res.status(401)
    res.json('Access denied, invalid token')
    return
  }
}