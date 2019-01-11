const router = require('express').Router()
// Set your secret key: remember to change this to your live secret key in production
// See your keys here: https://dashboard.stripe.com/account/apikeys
const keyPublishable =
  process.env.PUBLISHABLE_KEY || 'pk_test_3bU1MdFTKGzpHq5nQtAG4fgL'
var stripe = require('stripe')('sk_test_WUB0FMc7GlzcWcjEPGlSpDb1')

router.post('/charge', (req, res) => {
  let amount = 500

  stripe.customers
    .create({
      email: req.body.stripeEmail,
      source: req.body.stripeToken
    })
    .then(customer =>
      stripe.charges.create({
        amount: req.body.price,
        description: req.body.name, // this should be the name of experience being purchaced
        currency: 'usd',
        customer: customer.id
      })
    )
    .then(charge => {
      res.json(charge)
    })
})
// // Token is created using Checkout or Elements!
// // Get the payment token ID submitted by the form:
// const token = req.body.stripeToken // Using Express

// const charge = stripe.charges.create({
//   amount: 999,
//   currency: 'usd',
//   description: 'Example charge',
//   source: token
// })

// })
