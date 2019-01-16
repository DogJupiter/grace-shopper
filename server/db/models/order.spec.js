const {expect} = require('chai')
const db = require('../index')
const Order = db.model('order')

describe('Order model', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })
})

let orders
beforeEach(function() {
  orders = Order.build({
    status: 'created',
    items: [
      {
        name: 'Jane Hotel After Midnight',
        imageUrl:
          'https://static.urbandaddy.com/uploads/assets/image/articles/standard/cf4eb440aea70a5e56c2453b9e3ce2101debb11e.jpg',
        category: 'drink',
        duration: '2 hour',
        price: 50,
        description: 'night out'
      }
    ],
    subtotal: 50
  })
})

describe('Order', function() {
  it('includes all the fields', function() {
    return orders.save().then(function(order) {
      expect(order.status).to.equal('created')
      expect(order.items).to.be.an('array')
      expect(order.items[0].name).to.equal('Jane Hotel After Midnight')
    })
  })

  it('requires `subtotal`', async () => {
    orders.subtotal = null

    let result, error
    try {
      result = await orders.validate()
    } catch (err) {
      error = err
    }

    if (result) throw Error('validation should fail when name is null')

    expect(error).to.be.an.instanceOf(Error)
  })
})
