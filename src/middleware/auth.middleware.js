// import express from 'express'
const jwt = require('jsonwebtoken')

const verifyJWT = (req, res, next) => {
  try {
    const authorizationHeader = (req.headers.authorization)
    const token = authorizationHeader.split(' ')[1]
    const decodedAccessToken = jwt.decode(token)
    const tokenSecret = process.env.TOKEN_SECRET
    req.body.userId = decodedAccessToken.user.id
    jwt.verify(token, tokenSecret)

    next()
  } catch (error) {
    res.status(401)
    res.json('Access denied, invalid token')
    return
  }
}

module.exports = { verifyJWT }