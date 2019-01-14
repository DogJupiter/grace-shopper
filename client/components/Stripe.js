import React from 'react'
import axios from 'axios'
import StripeCheckout from 'react-stripe-checkout'

const STRIPE_PUBLISHABLE =
  process.env.NODE_ENV === 'production'
    ? 'pk_test_EgaeqwoPyOeB26JZ6FF6obdv'
    : 'pk_test_EgaeqwoPyOeB26JZ6FF6obdv'
const PAYMENT_SERVER_URL =
  process.env.NODE_ENV === 'production' ? '/api/stripe' : '/api/stripe'

const CURRENCY = 'USD'

const fromDollarsToCent = amount => amount * 100

const errorPayment = data => {
  alert('Payment Error')
}

const onToken = (amount, description, successPayment) => token =>
  axios
    .post(PAYMENT_SERVER_URL, {
      description,
      source: token.id,
      currency: CURRENCY,
      amount: fromDollarsToCent(amount)
    })
    .then(successPayment)
    .catch(errorPayment)

const Stripe = ({name, description, amount, successPayment}) => (
  <StripeCheckout
    name={name}
    description={description}
    amount={fromDollarsToCent(amount)}
    token={onToken(amount, description, successPayment)}
    currency={CURRENCY}
    stripeKey={STRIPE_PUBLISHABLE}
  />
)

export default Stripe
