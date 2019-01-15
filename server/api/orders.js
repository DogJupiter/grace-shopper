const router = require('express').Router()
const {Order} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    if (req.user) {
      let customerOrders = await Order.findAll({where: {userId: req.user.id}})
      res.send(customerOrders)
    } else res.status(403).send('Forbidden')
  } catch (err) {
    next(err)
  }
})

router.post('/', async (req, res, next) => {
  try {
    const order = Order.create(req.body)
    // res.send(order)
    res.send(await Order.findOne({where: {id: order.id}}))
  } catch (err) {
    next(err)
  }
})

router.get('/:orderId', async (req, res, next) => {
  try {
    const requestedOrder = await Order.findOne({
      where: {id: req.params.orderId}
    })
    if (req.user && requestedOrder.userId === req.user.id)
      res.send(requestedOrder)
    else res.status(403).send('Forbidden')
  } catch (err) {
    next(err)
  }
})
router.put('/:orderId', async (req, res, next) => {
  try {
    const requestedOrder = await Order.findOne({
      where: {id: req.params.orderId}
    })
    if (req.user && requestedOrder.userId === req.user.id) {
      requestedOrder.status = 'completed'
      res.sendStatus(200)
    } else res.status(403).send('Forbidden')
  } catch (err) {
    next(err)
  }
})
