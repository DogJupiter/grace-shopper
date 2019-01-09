const router = require('express').Router()
const {Experience, Review} = require('../db/models')
module.exports = router

// GET /api/experiences
router.get('/', async (req, res, next) => {
  try {
    const experiences = await Experience.findAll({
      include: [{model: Review, as: 'review'}]
    })
    res.json(experiences)
  } catch (err) {
    next(err)
  }
})

// GET /api/experiences/:id
router.get('/:id', async (req, res, next) => {
  try {
    const experienceId = req.params.id //CG: Maybe cast to number, but not required.
    const requestedExperience = await Experience.find({
      //CG: I'd specify findOne
      where: {
        id: experienceId
      },
      include: [{model: Review, as: 'review'}]
    })
    res.json(requestedExperience)
  } catch (err) {
    next(err)
  }
})
