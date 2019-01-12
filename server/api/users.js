const router = require('express').Router()
const {User, Order, Item, Experience} = require('../db/models')
module.exports = router

// GET /api/users
router.get('/', async (req, res, next) => {
  try {
    const users = await User.findAll({
      // explicitly select only the id and email fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      attributes: ['id', 'email', 'firstName', 'lastName']
    })
    res.json(users)
  } catch (err) {
    next(err)
  }
})

// // GET /api/users/:id
router.get('/:id', async (req, res, next) => {
  const userId = Number(req.params.id)
  if (req.user && req.user.id === userId) {
    try {
      const selectedUser = await User.findById(userId)
      res.json(selectedUser)
    } catch (err) {
      next(err)
    }
  } else {
    res.status(403).send('Forbidden')
  }
})

/**
 * GET/POST/PUT/DELETE ORDERS
 */

// Get /api/users/:id/orders
// get all orders
router.get('/:id/orders', async (req, res, next) => {
  const userId = Number(req.params.id)
  // if (req.user && req.user.id === userId) {
  try {
    // find all the order that match the userId including what inside of it
    const order = await Order.findAll({
      where: {userId},
      include: [{model: Item, include: [{model: Experience}]}]
    })
    if (!order) {
      return res.status(401).send('Unauthorized')
    }
    return res.json(order)
  } catch (error) {
    next(error)
  }
  // } else {
  //   res.status(403).send('Forbidden')
  // }
})

// POST /api/users/:id/orders
// add order based on specific user
router.post('/:id/orders', async (req, res, next) => {
  const userId = Number(req.params.id)
  if (req.user && req.user.id === userId) {
    // get all Order's information
    let newOrder = req.body
    // attach userId on the object
    newOrder.userId = req.params.id
    try {
      // create the new order
      const order = await Order.create(newOrder)
      res.json(order)
    } catch (error) {
      next(error)
    }
  } else {
    res.status(403).send('Forbidden')
  }
})

// router.post('/:id/orders/:orderId/items', async (req, res, next) => {
//   const userId = Number(req.params.id)
//   let newItem = req.body
// })

router.put('/:id/orders/:orderId', async (req, res, next) => {
  const userId = Number(req.params.id)
  if (req.user && req.user.id === userId) {
    const quantity = req.body.quantity
    const orderId = req.params.orderId
    try {
      const update = await Order.update(
        {quantity},
        {where: {id: orderId}, fields: ['quantity']}
      )
      if (update) {
        res.json(update)
        res.sendStatus(204)
      }
      return res.status(404).send()
    } catch (error) {
      next(error)
    }
  } else {
    res.status(403).send('Forbidden')
  }
})

router.delete('/:id/orders/:orderId', async (req, res, next) => {
  const userId = Number(req.params.id)
  if (req.user && req.user.id === userId) {
    try {
      await Order.destroy({where: {id: req.params.orderId}})
      res.status(202).send()
    } catch (error) {
      next(error)
    }
  } else {
    res.status(403).send('Forbidden')
  }
})
