const router = require('express').Router()
const {Review, User} = require('../db/models')
module.exports = router

// GET /api/reviews
//CG: Delete this route.
router.get('/', async (req, res, next) => {
  try {
    const reviews = await Review.findAll({include: [{model: User, as: 'user'}]})
    res.json(reviews)
  } catch (err) {
    next(err)
  }
})
