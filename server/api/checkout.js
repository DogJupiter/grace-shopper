/* Not working right now need to fix*/
import stripePackage from 'stripe'
import logger from 'winston'
import config from 'config'

const stripe = stripePackage(config.payment.stripeSecretKey)

const CURRENCY_USD = 'usd'

class StripeClient {
  constructor() {}

  validatePayment({expected, actual}) {
    if (Math.abs(actual - expected) >= 0.01) {
      throw new Error(`Incorrect payment amount expecting ${expected}`)
    }
  }

  async submitPayment({stripeToken, description, amount}) {
    if (stripeToken.cardId) {
      // user pay
      return stripe.charges.create({
        amount: Math.floor(amount * 100),
        currency: CURRENCY_USD,
        source: stripeToken.cardId,
        customer: stripeToken.customerId,
        description
      })
    }
    // non-member aka guest pay
    const customer = await stripe.customers.create({
      source: stripeToken.id,
      email: stripeToken.email
    })

    logger.info(`Added customer: ${JSON.stringify(customer)}`)
    logger.info(description)

    return stripe.charges.create({
      amount: Math.floor(amount * 100),
      currency: CURRENCY_USD,
      customer: customer.id,
      description
    })
  }

  async createCustomer(email) {
    const customer = await stripe.customers.create({
      description: email,
      email
    })
    return customer
  }

  async retrieveCustomer(customerID) {
    const customer = await stripe.customers.retrieve(customerID)
    return customer
  }
}

export default new StripeClient()
