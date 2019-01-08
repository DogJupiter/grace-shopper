const router = require('express').Router()
const {Order, User, Experience} = require('../db/models')
module.exports = router

// GET /api/orders
router.get('/', async (req, res, next) => {
  try {
    const orders = await Order.findAll({include: [User, Experience]})
    res.json(orders)
  } catch (err) {
    next(err)
  }
})
