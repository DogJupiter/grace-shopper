const router = require('express').Router()
const {Experience, Category} = require('../db/models')
module.exports = router

// GET /api/categories
router.get('/', async (req, res, next) => {
  try {
    const categories = await Category.findAll({})
    res.json(categories)
  } catch (err) {
    next(err)
  }
})

// GET /api/categories/:id
router.get('/:id', async (req, res, next) => {
  try {
    const requestedCategory = Number(req.params.id)
    const filteredExperiences = await Experience.findAll({
      where: {
        categoryId: requestedCategory
      }
    })

    res.json(filteredExperiences)
  } catch (err) {
    next(err)
  }
})
