const router = require('express').Router()
const {Order, User, Experience} = require('../db/models')
module.exports = router

// GET /api/orders/
router.get('/', async (req, res, next) => {
  try {
    const customerOrders = await Order.findAll({})
    res.json(customerOrders)
  } catch (err) {
    next(err)
  }
})

// GET /api/orders/:customerId
router.get('/:customerId', async (req, res, next) => {
  // if (req.user && req.user.id === userId) {
  try {
    const customerId = Number(req.params.id)
    const customerOrders = await Order.findAll({
      // where: {
      //   customerId: customer
      // },
      include: [{model: User}]
    })
    res.json(customerOrders)
  } catch (err) {
    console.log('hit error')
    next(err)
  }
  // } else {
  //   res.status(403).send('Forbidden')
  // }
})

/*
Corey's Code Review Notes
[DONE] Orders GET route -- // CG: Anyone logged in or not, the user in question or not, can find the orders for every person.
    **Are the model associations set up so that we can successfully query the Orders? (i.e. customerId)

**QUESTION** Is the route above redundant with the one flagged in users route?
*/
