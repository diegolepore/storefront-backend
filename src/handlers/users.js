// import express, { Request, Response } from 'express'
const store = require('../models/user').UserStore
const jwt = require('jsonwebtoken')
const verifyJWT = require('../middleware/auth.middleware').verifyJWT

const create = async (req, res) => {
  const user = {
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    email: req.body.email,
    pass: req.body.pass
  }

  try {
    const newUser = await store.create(user)
    res.status(201)
    res.json(newUser)
  } catch (error) {
    res.status(400)
    res.json(error)
  }
}

const index = async (req, res) => {
  try {
    const user = await store.index()
    res.json(user)
  } catch (error) {
    res.status(400)
    res.json(error)
  }
}

const show = async (req, res) => {
  try {
    const id = req.params.id
    const user = await store.show(id)
    res.json(user)
  } catch (error) {
    res.status(400)
    res.json(error)
  }
}

const remove = async (req, res) => {
  try {
    const id = req.params.id
    const user = await store.delete(id)
    res.json(user)
  } catch (error) {
    res.status(400)
    res.json(error)
  }
}

const authenticate = async (req, res) => {
  try {
    const user = await store.authenticate(req.body.email, req.body.pass)
    const access_token = jwt.sign({user}, process.env.TOKEN_SECRET)
    const decodedAccessToken = jwt.decode(access_token)

    if(decodedAccessToken.user.id) {
      res.json({access_token: access_token})
    }
  } catch (error) {
    res.status(401)
    res.json({ message: 'Whoops, it seems either your email or password are incorrect, please try again'})
  }
}

const userRoutes = (app) => {
  app.post('/users', create)
  app.post('/users/auth', authenticate)
  app.get('/users', verifyJWT, index)
  app.get('/users/:id', verifyJWT, show)
  app.delete('/users/:id', verifyJWT, remove)
}

module.exports = userRoutes