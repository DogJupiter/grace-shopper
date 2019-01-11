import React from 'react'
import StripeCheckout from 'react-stripe-checkout'

export default class Checkout extends React.Component {
  onToken = (token, address) => {}

  render() {
    return (
      <StripeCheckout
        stripeKey="pk_test_3bU1MdFTKGzpHq5nQtAG4fgL"
        token={this.onToken}
      />
    )
  }
}
