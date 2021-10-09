// import express, { Request, Response } from 'express'
import { OrderProductStore as store } from '../models/order_product'
import { verifyJWT } from '../middleware/auth.middleware'


const create = async (req, res) => {
  try {
    const orderId = req.params.id
    const productId = req.body.product_id
    const quantity = parseInt(req.body.quantity)

    const productAddedToCart = await store.create(quantity, orderId, productId)
    res.status(201)
    res.json(productAddedToCart)
  } catch (error) {
    res.status(400)
    res.json(error)
  }
}

const editQuantity = async (req, res) => {
    try {
    const product_id = req.body.product_id
    const quantity = parseInt(req.body.quantity)

    const productQuantityUpdateResponse = await store.editQuantity(product_id, quantity)
    res.status(201)
    res.json(productQuantityUpdateResponse)
  } catch (error) {
    res.status(400)
    res.json(error)
  }
}

const orderRoutes = (app) => {
  app.post('/orders/:id/products', verifyJWT, create)
  app.patch('/orders/edit-product-quantity', verifyJWT, editQuantity)
}

export default orderRoutes