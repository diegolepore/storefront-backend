import express from 'express'
import { DashboardQueries } from '../services/dashboard'
import { verifyJWT } from '../middleware/auth.middleware'

const currentOrderByUser = async (req: express.Request, res: express.Response) => {
  try {
    const userIdFromVerifyJWTMiddleware = req.body.userId
    const activeOrder = await DashboardQueries.currentOrderByUser(userIdFromVerifyJWTMiddleware)
    res.json(activeOrder)
  } catch (error) {
    res.status(400)
    res.json(error)
  }
}

const dashboardRoutes = (app: express.Application): void => {
  app.get('/active-order', verifyJWT, currentOrderByUser)
}

export default dashboardRoutes