/* global describe beforeEach it */

const {expect} = require('chai')
const request = require('supertest')
const db = require('../db')
const app = require('../index')
const Order = db.model('user')

describe('Order routes', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('/api/orders/', () => {
    const dummyOrder = {
      experienceId: [0, 1], //if the order contains multiple experience purchases
      userId: 0,
      quantity: 1
    }

    beforeEach(() => {
      return Order.create({dummyOrder})
    })

    it('GET /api/orders', async () => {
      const res = await request(app)
        .get('/api/orders')
        .expect(200)

      expect(res.body).to.be.an('array')
      expect(res.body[0].quantity).to.be.equal(dummyOrder.quantity)
    })
  }) // end describe('/api/users')
}) // end describe('User routes')
