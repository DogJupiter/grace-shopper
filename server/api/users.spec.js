/* global describe beforeEach it */

const {expect} = require('chai')
const request = require('supertest')
const db = require('../db')
const app = require('../index')
const User = db.model('user')

describe('User routes', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('/api/users/', () => {
    // const dummyUser = {
    //   email: 'test@email.com',
    //   password: '1234',
    //   firstName: 'Arnold',
    //   lastName: 'Schwarzenegger'
    // }

    beforeEach(() => {
      return User.create({
        imageUrl:
          'http://3.bp.blogspot.com/-JpW6qdc5BM4/T79oSN0Yb8I/AAAAAAAAFxg/BwTLJ-6RhfY/s1600/arnold-schwarzenegger-20060109-99172.jpg',
        email: 'test@email.com',
        password: '1234',
        firstName: 'Arnold',
        lastName: 'Schwarzenegger'
      })
    })

    xit('GET /api/users', async () => {
      const res = await request(app)
        .get('/api/users')
        .expect(200)

      expect(res.body).to.be.an('array')
      expect(res.body[0].email).to.be.equal('test@email.com')
    })
  }) // end describe('/api/users')
}) // end describe('User routes')
