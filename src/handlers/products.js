// import express, { Request, Response } from 'express'
const store = require('../models/product').ProductStore
const verifyJWT = require('../middleware/auth.middleware').verifyJWT

const create = async (req, res) => {
  const products = {
    name: req.body.name,
    description: req.body.description,
    image_url: req.body.image_url,
    price: req.body.price,
    category: req.body.category
  }

  try {
    const product = await store.create(products)
    res.status(201)
    res.json(product)
  } catch (error) {
    res.status(400)
    res.json(error)
  }
}
const index = async (req, res) => {
  try {
    const products = await store.index()
    res.json(products)
  } catch (error) {
    res.status(400)
    res.json(error)
  }
}

const show = async (req, res) => {
  try {
    const id = req.params.id
    const product = await store.show(id)
    res.json(product)
  } catch (error) {
    res.status(400)
    res.json(error)
  }
}

const remove = async (req, res) => {
  try {
    const id = req.params.id
    const product = await store.delete(id)
    res.json(product)
  } catch (error) {
    res.status(400)
    res.json(error)
  }
}

const productRoutes = (app) => {
  app.post('/products', verifyJWT, create)
  app.get('/products', index)
  app.get('/products/:id', show)
  app.delete('/products/:id', verifyJWT, remove)
}

module.exports = productRoutes