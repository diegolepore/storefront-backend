import express from 'express'
import { DashboardQueries } from '../services/dashboard'
import { verifyJWT } from '../middleware/auth.middleware'

const dashboard = express.Router()

const currentOrderByUser = async (req: express.Request, res: express.Response) => {
  try {
    // @ts-ignore
    const activeOrder = await DashboardQueries.currentOrderByUser(req.userId)
    res.json(activeOrder)
  } catch (error) {
    res.status(400)
    res.json(error)
    console.log(error)
  }
}

const dashboardRoutes = (app: express.Application) => {
  app.get('/active-order', verifyJWT, currentOrderByUser)
}

export default dashboardRoutes