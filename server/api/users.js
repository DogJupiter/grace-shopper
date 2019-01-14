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
// sabira: fetch all orders including cart (eager load for calculating subtotal and displaying all items what are inside of it)

router.get('/:id/orders', async (req, res, next) => {
  const userId = Number(req.params.id)
  const whereObj = {
    userId
  }
  if (req.query.completed) {
    whereObj.completed = true
  }
  // sabira: commented out security to test routes
  // if (req.user && req.user.id === userId) {
  try {
    const order = await Order.findAll({
      where: whereObj,
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

//sabira: fetch all completed orders
// cg: ?completed=true
router.get('/:id/orders/completed', async (req, res, next) => {
  const userId = Number(req.params.id)
  // sabira: commented out security to test route
  // if (req.user && req.user.id === userId) {
  try {
    const order = await Order.findAll({
      where: {userId, status: 'completed'},
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

//sabira: get cart (if status set to 'created' it means it cart, otherwise it's comleted order)
router.get('/:id/orders/cart', async (req, res, next) => {
  const userId = Number(req.params.id)
  // sabira: commented out security to test route
  // if (req.user && req.user.id === userId) {
  try {
    const order = await Order.findOne({
      where: {status: 'created'},
      include: [{model: Item, include: [{model: Experience}]}]
    })
    res.send(order)
  } catch (err) {
    next(err)
  }
  // } else {
  //   res.status(403).send('Forbidden')
  // }
})

// POST /api/users/:id/orders
// add order based on specific user
// ?
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

//sabira: fetch specific completed order for specific user, eager load always nessesary to calculate subtotal
router.get('/:id/orders/:orderId', async (req, res, next) => {
  try {
    const order = await Order.findOne({
      where: {id: req.params.orderId, status: 'completed'},
      include: [{model: Item, include: [{model: Experience}]}]
    })
    res.send(order)
  } catch (err) {
    next(err)
  }
})

//CG: This looks like it only exists in a world where the url bar is the only thing that can have info.
router.put('/:id/orders/cart/items/:itemId/add', async (req, res, next) => {
  try {
    const cart = await Order.findOne({where: {status: 'created'}})
    const item = await Item.findOne({where: {id: req.params.itemId}})
    item.addQuantity()
    console.log(item, 'item')
    res.send(await Item.findAll({where: {orderId: cart.id}}))
  } catch (err) {
    next(err)
  }
})

//sabira: add item to cart route (axios.post('route', experience))
router.post('/:id/orders/cart/', async (req, res, next) => {
  try {
    //sabira: find the cart if it exists
    let cart = await Order.findOne({where: {status: 'created'}})
    //sabira: if we don't have a cart yet - create a cart
    if (!cart) {
      cart = await Order.create()
    }
    //sabira: add item to the created/existing cart
    await Item.create({
      quantity: 1,
      orderId: cart.id,
      experienceId: req.body.id
    })
    res.send(await Item.findAll({where: {orderId: cart.id}}))
  } catch (err) {
    next(err)
  }
})

router.post('/:id/orders/cart/items/:itemId/add', async (req, res, next) => {
  try {
    const cart = await Order.findOne({where: {status: 'created'}})
    const item = await Item.findOne({where: {id: req.params.itemId}})
    item.addQuantity()
    res.send(await Item.findAll({where: {orderId: cart.id}}))
  } catch (err) {
    next(err)
  }
})

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
