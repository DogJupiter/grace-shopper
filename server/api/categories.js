const router = require('express').Router()
const {
  Experience,
  Review,
  CategoryExperience,
  Category
} = require('../db/models')
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
      },
      include: [{model: Category}]
    })
    // console.log('HERE', filteredExperiences.get())

    res.json(filteredExperiences)
  } catch (err) {
    next(err)
  }
})

// // GET /api/categories/:id/experiences
// router.get('/:id/experiences', async (req, res, next) => {
//   const requestedCategory = Number(req.params.id)
//   try {
//     //We've chosen the category (e.g. food)
//     //Poll the cat-exp table
//     const entries = await CategoryExperience.findAll({
//       where: {
//         categoryId: requestedCategory
//       }
//     })
//     //This will return an array of entries which are categorized as "food" or whatever.

//     //Each of these elements in the array will have an experience ID.

//     const filteredExperiences = await Experience.findAll({
//       // where: {
//       //   id: entries.id
//       // }
//     })
//     // const test = await Experience.findAll({})
//     res.json(filteredExperiences)
//   } catch (err) {
//     next(err)
//   }
// })
