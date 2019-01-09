const router = require('express').Router()
const {User} = require('../db/models')
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
// // GET /api/users/:id/orders
