/* global describe beforeEach it */

const {expect} = require('chai')
const request = require('supertest')
const db = require('../db')
const app = require('../index')
const Order = db.model('order')

describe('Order routes', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('/api/orders/', () => {
    beforeEach(() => {
      return Order.create({
        quantity: 1
      })
    })

    xit('GET /api/orders', async () => {
      const res = await request(app)
        .get('/api/orders')
        .expect(200)
      expect(res.body).to.be.an('array')
      expect(res.body[0].quantity).to.be.equal(1)
    })
  }) // end describe('/api/users')
}) // end describe('User routes')
