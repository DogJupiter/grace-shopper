const router = require('express').Router()
module.exports = router

router.use('/users', require('./users'))
router.use('/experiences', require('./experiences'))
router.use('/orders', require('./orders'))
router.use('/categories', require('./categories'))
router.use('/stripe', require('./stripe'))

router.use((req, res, next) => {
  const error = new Error('Not Found')
  error.status = 404
  next(error)
})
