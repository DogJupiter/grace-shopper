const router = require('express').Router()
const {Order, User, Experience} = require('../db/models')
module.exports = router

// GET /api/orders
// CG: Anyone logged in or not, the user in question or not, can find the orders for every person.
router.get('/', async (req, res, next) => {
  try {
    const orders = await Order.findAll({include: [{model: User, as: 'user'}]})
    res.json(orders)
  } catch (err) {
    next(err)
  }
})
