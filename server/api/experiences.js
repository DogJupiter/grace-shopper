const router = require('express').Router()
const {Experience, Review} = require('../db/models')
module.exports = router

// GET /api/experiences
router.get('/', async (req, res, next) => {
  try {
    const experiences = await Experience.findAll({include: [Review]})
    res.json(experiences)
  } catch (err) {
    next(err)
  }
})

// GET /api/experiences/:id
router.get('/:id', async (req, res, next) => {
  try {
    const experienceId = req.params.id
    const requestedExperience = await Experience.find({
      where: {
        id: experienceId
      },
      include: [Review]
    })
    res.json(requestedExperience)
  } catch (err) {
    next(err)
  }
})
