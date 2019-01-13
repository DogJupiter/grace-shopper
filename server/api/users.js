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
  // sabira: commented out security to test routes
  // if (req.user && req.user.id === userId) {
  try {
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

//sabira: fetch all completed orders
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

//sabira: add item to cart route
router.post('/:id/orders/cart/', async (req, res, next) => {
  console.log(req.body)
  try {
    //sabira: find the cart if it exists
    let cart = await Order.findOne({
      where: {status: 'created', userId: req.params.id}
    })

    let item = await Item.findAll({where: {orderId: cart.id}})
    //sabira: if we don't have a cart yet - create a cart
    if (!cart) {
      cart = await Order.create()

      let newItem = await Item.create({
        cartArray: [].push(req.body),
        quantity: 1,
        orderId: cart.id,
        experienceId: Number(req.body.id)
      })
      let detailedItem = await Item.find({
        where: {id: newItem.id},
        include: [{model: Experience}]
      })
      console.log(detailedItem, 'ALL THE DETAILS HERE')
      res.send(detailedItem)
    } else {
      // else if (item.experienceId === req.body.id) {
      //   await item.addQuanity()
      //   res.send(item)
      // }
      const newItem = await Item.create({
        quantity: 1,
        orderId: cart.id,
        experienceId: req.body.id,
        imageUrl: req.body.imageUrl,
        price: req.body.price,
        name: req.body.name
      })
      res.send(newItem)
    }
    // //sabira: add item to the created/existing cart
    // await Item.create({
    //   quantity: 1,
    //   orderId: cart.id,
    //   experienceId: req.body.id
    // })
    // res.send(await Item.findAll({where: {orderId: cart.id}}))
  } catch (err) {
    next(err)
  }
})

// router.put('/:id/orders/:orderId/items/:itemId', async(req,res, next) => {

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
