// import express, { Request, Response } from 'express'
const store = require('../models/order').OrderStore
const verifyJWT = require('../middleware/auth.middleware').verifyJWT

const create = async (req, res) => {
  try {
    const order = {
      order_status: req.body.order_status,
      user_id: req.body.user_id
    }

    const userIdFromDecodedJWTMiddleware = req.body.userId
    const result = await store.create(
      order, 
      userIdFromDecodedJWTMiddleware
    )
    res.status(201)
    res.json(result)
  } catch (error) {
    res.status(400)
    res.json(error)
  }
}

const index = async (req, res) => {
  try {
    const userIdFromDecodedJWTMiddleware = req.body.userId
    const result = await store.index(userIdFromDecodedJWTMiddleware)
    res.json(result)
  } catch (error) {
    res.status(400)
    res.json(error)
  }
}

const show = async (req, res) => {
  try {
    const userIdFromDecodedJWTMiddleware = req.body.userId
    const result = await store.show(req.params.id, userIdFromDecodedJWTMiddleware)
    res.json(result)
  } catch (error) {
    res.status(400)
    res.json(error)
  }
}

const remove = async (req, res) => {
  try {
    const userIdFromDecodedJWTMiddleware = req.body.userId
    const result = await store.delete(
      req.params.id,
      userIdFromDecodedJWTMiddleware
    )
    res.json(result)
  } catch (error) {
    res.status(400)
    res.json(error)
  }
}

const editStatus = async (req, res) => {
  try {
    const userIdFromDecodedJWTMiddleware = req.body.userId
    const result = await store.editStatus(
      req.params.id, 
      userIdFromDecodedJWTMiddleware,
      req.body.status
    )
    res.json(result)
  } catch (error) {
    res.status(400)
    res.json(error)
  }
}

const orderRoutes = (app) => {
  app.post('/orders', verifyJWT, create)
  app.get('/orders', verifyJWT, index)
  app.get('/orders/:id', verifyJWT, show)
  app.put('/orders/:id', verifyJWT, editStatus)
  app.delete('/orders/:id', verifyJWT, remove)
}

module.exports = orderRoutes