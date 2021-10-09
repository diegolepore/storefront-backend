// import express from 'express'
const CartQueries = require('../services/cart').CartQueries
const verifyJWT = require('../middleware/auth.middleware').verifyJWT

const addProductToCart = async (req, res) => {
  try {
    const userIdFromVerifyJWTMiddleware = req.body.userId
    const cartRes = await CartQueries.addProductToCart(
      userIdFromVerifyJWTMiddleware,
      req.body.productId,
      req.body.quantity
    )
    res.json(cartRes)
  } catch (error) {
    res.status(400)
    res.json(error)
  }
}

const deleteProductFromCart = async (req, res) => {
  try {
    const deleteProductFromCartRes = await CartQueries.deleteProductFromCart(
      req.params.order_id,
      req.params.product_id
    )
    res.json(deleteProductFromCartRes)
  } catch (error) {
    res.status(400)
    res.json(error)
  }
}

const cartRoutes = (app) => {
  app.post('/add-to-cart', verifyJWT, addProductToCart)
  app.delete('/delete-porduct-from-cart/order/:order_id/product/:product_id', verifyJWT, deleteProductFromCart)
}

module.exports = cartRoutes