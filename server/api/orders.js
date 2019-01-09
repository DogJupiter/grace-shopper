const router = require('express').Router()
const {Order, User, Experience} = require('../db/models')
module.exports = router

// GET /api/orders
router.get('/', async (req, res, next) => {
  try {
    // const orders = await Order.findAll({include: [{model: User, as: 'user'}, {model: Experience, as: 'experience'}]})

    const orders = await Order.findAll({include: [{model: User, as: 'user'}]})
    res.json(orders)
  } catch (err) {
    next(err)
  }
})
