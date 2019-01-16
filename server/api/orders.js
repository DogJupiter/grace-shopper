const router = require('express').Router()
const {Order, User, Experience} = require('../db/models')
module.exports = router

// GET /api/orders/
// router.get('/', async (req, res, next) => {
//   try {
//     const customerOrders = await Order.findAll({})
//     res.json(customerOrders)
//   } catch (err) {
//     next(err)
//   }
// })

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

// GET /api/orders/:customerId
// router.get('/:customerId', async (req, res, next) => {
//   // if (req.user && req.user.id === userId) {
//   try {
//     const customerId = Number(req.params.id)
//     const customerOrders = await Order.findAll({
//       // where: {
//       //   customerId: customer
//       // },
//       include: [{model: User}]
//     })
//     res.json(customerOrders)
//   } catch (err) {
//     console.log('hit error')
//     next(err)
//   }
//   // } else {
//   //   res.status(403).send('Forbidden')
//   /
// })

router.post('/', async (req, res, next) => {
  try {
    // const order = Order.create(req.body)
    const order = await Order.create(req.body)
    // res.send(order)
    res.send(order)
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
    // if (req.user && requestedOrder.userId === req.user.id)
    requestedOrder.status = 'completed'
    requestedOrder.save(() => console.log('REQUESTED ORDER UPDATED'))
    res.send(requestedOrder)

    // else res.status(403).send('Forbidden')
  } catch (err) {
    next(err)
  }
})

/*
Corey's Code Review Notes
[DONE] Orders GET route -- // CG: Anyone logged in or not, the user in question or not, can find the orders for every person.
    **Are the model associations set up so that we can successfully query the Orders? (i.e. customerId)

**QUESTION** Is the route above redundant with the one flagged in users route?
*/
