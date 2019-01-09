const router = require('express').Router()
const {Experience, Review} = require('../db/models')
module.exports = router

// GET /api/experiences
router.get('/', async (req, res, next) => {
  try {
    const experiences = await Experience.findAll({
      include: [{model: Review}]
    })
    res.json(experiences)
  } catch (err) {
    next(err)
  }
})

// GET /api/experiences/:category
router.get('/:category', async (req, res, next) => {
  const requestedCategory = Number(req.params.id)
  try {
    const categorizedExp = await Experience.findAll({
      where: {
        categoryId: requestedCategory
      }
    })
    res.json(categorizedExp)
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
      include: [{model: Review}]
    })
    res.json(requestedExperience)
  } catch (err) {
    next(err)
  }
})

/*
Corey's Code Review Notes
[DONE] /:id GET route -- //CG: I'd specify findOne 
[DONE] / GET ROUTE -- //CG: Maybe cast to number, but not required.
*/
