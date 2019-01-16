const router = require('express').Router()
const {Experience, Review, User, Category} = require('../db/models')
module.exports = router

// GET /api/experiences
router.get('/', async (req, res, next) => {
  try {
    if (req.query.category) {
      const filterExperiences = await Experience.findAll({
        where: {category: req.query.category}
      })

      res.json(filterExperiences)
    } else {
      const experiences = await Experience.findAll({
        include: [{model: Review}]
      })
      res.json(experiences)
    }
  } catch (err) {
    next(err)
  }
})

// GET /api/experiences/:id

router.get('/:id', async (req, res, next) => {
  try {
    const experienceId = Number(req.params.id)
    const requestedExperience = await Experience.findOne({
      where: {
        id: experienceId
      },
      include: [{model: Review, include: [{model: User}]}]
    })
    res.json(requestedExperience)
  } catch (err) {
    next(err)
  }
})
router.get('/:id', async (req, res, next) => {
  try {
    const experienceId = Number(req.params.id)
    const requestedExperience = await Experience.findOne({
      where: {
        id: experienceId
      },
      include: [{model: Review, include: [{model: User}]}]
    })

    if (requestedExperience) {
      res.json(requestedExperience)
    } else {
      res.status(404).send()
    }
  } catch (err) {
    next(err)
  }
})

router.post('/:id', async (req, res, next) => {
  try {
    console.log('POST ROUTE HERE')
    const experienceToReview = Number(req.params.id)
    const reviewToPost = await Review.create({
      userId: 8,
      description: req.body.description,
      experienceId: experienceToReview,
      stars: 5
    })
    await reviewToPost.save()

    const returnReview = reviewToPost.toJSON()
    res.json(returnReview)
  } catch (err) {
    next(err)
  }
})
