import React from 'react'
import axios from 'axios'
import StripeCheckout from 'react-stripe-checkout'
import {purchaseComplete} from '../store/cart'
import store from '../store'

const STRIPE_PUBLISHABLE =
  process.env.NODE_ENV === 'production'
    ? 'pk_test_q4ugy0Tbx2IZB1uGlOAEoRJe'
    : 'pk_test_q4ugy0Tbx2IZB1uGlOAEoRJe'
const PAYMENT_SERVER_URL =
  process.env.NODE_ENV === 'production'
    ? 'benewyork.herokuapp.com'
    : 'http://localhost:8080/api/stripe'

const CURRENCY = 'USD'

const fromDollarsToCent = amount => amount * 100

const successPayment = data => {
  alert('Payment Success')
}

const errorPayment = data => {
  alert('Payment Error')
}

const completeOrder = () => {
  let orderId = localStorage.getItem('orderId')
  store.dispatch(purchaseComplete(orderId))
}

const onToken = (amount, description) => token =>
  axios
    .post(PAYMENT_SERVER_URL, {
      description,
      source: token.id,
      currency: CURRENCY,
      amount: fromDollarsToCent(amount)
    })
    .then(successPayment)
    .then(completeOrder())
    .catch(errorPayment)

const Stripe = ({name, description, amount}) => (
  <StripeCheckout
    name={name}
    description={description}
    amount={fromDollarsToCent(amount)}
    token={onToken(amount, description)}
    currency={CURRENCY}
    stripeKey={STRIPE_PUBLISHABLE}
  />
)

export default Stripe
