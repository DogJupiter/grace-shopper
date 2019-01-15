const router = require('express').Router()
const {Experience, Review, User, Category} = require('../db/models')
module.exports = router

// GET /api/experiences
router.get('/', async (req, res, next) => {
  try {
    if (req.query.category) {
      const filterExperiences = await Experience.findAll({
        include: [
          {model: Review},
          {
            model: Category,
            where: {
              type: req.query.category
            }
          }
        ]
      })

      res.json(filterExperiences)
    } else {
      const experiences = await Experience.findAll({
        include: [{model: Review}, {model: Category}]
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
    res.json(requestedExperience)
  } catch (err) {
    next(err)
  }
})
