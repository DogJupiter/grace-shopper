const router = require('express').Router()
// Set your secret key: remember to change this to your live secret key in production
// See your keys here: https://dashboard.stripe.com/account/apikeys
const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY // PLACE THIS IN SECRET FILE
const stripe = require('stripe')(STRIPE_SECRET_KEY)

router.get('/', (req, res, next) => {
  res.send({message: 'reaching stripe checkout!'})
})

router.post('/', async (req, res, next) => {
  try {
    const customer = await stripe.customers.create({
      email: req.body.stripeEmail,
      source: req.body.stripeToken
    })
    const charge = await stripe.charges.create({
      amount: req.body.price,
      description: req.body.name, // this should be the name of experience being purchaced
      currency: 'usd',
      customer: customer.id
    })

    res.json(charge)
  } catch (error) {
    next(error)
    console.log(error)
  }
})

module.exports = router
