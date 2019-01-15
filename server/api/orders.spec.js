// const {expect} = require('chai')
const request = require('supertest')
const db = require('../db')
const app = require('../index')
const Order = db.model('order')
const User = db.model('user')

const authenticatedUser = request(app)

describe('Order routes', () => {
  beforeEach(async () => {
    let user = await User.create({
      firstName: 'Fake',
      lastName: 'User',
      email: 'fake@user.com',
      passowrd: '123',
      imageUrl:
        'https://images.unsplash.com/photo-1546872887-f26e5c225849?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2090&q=80'
    })

    return db.sync({force: true})
  })

  describe('/api/orders/', () => {
    beforeEach(() => {
      return Order.create({
        quantity: 1,
        status: 'created',
        subtotal: 0,
        items: [{id: 1, name: 'Pizza Tour with Pizza Rat'}]
      })
    })

    it('should return a 200 response if the user is logged in', done => {
      authenticatedUser.get('/auth/login').expect(200, done)
    })

    // xit('GET /api/orders', async () => {
    //   console.log('here is user', JSON.stringify(user))
    //   const res = await request(app)
    //     .get('/api/orders')
    //     .send(user)
    //     .expect(200)

    //   // expect(res.body).to.be.an('array')
    //   // expect(res.body[0].quantity).to.be.equal(1)
    // })
  })
})
