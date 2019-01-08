/* global describe beforeEach it */

const {expect} = require('chai')
const request = require('supertest')
const db = require('../db')
const app = require('../index')
const Review = db.model('user')

describe('Review routes', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('/api/reviews/', () => {
    const dummyReview = {
      description: 'This experience was rad.',
      stars: 5 // is "stars" the correct column type?
    }

    beforeEach(() => {
      return Review.create({dummyReview})
    })

    it('GET /api/reviews', async () => {
      const res = await request(app)
        .get('/api/reviews')
        .expect(200)

      expect(res.body).to.be.an('array')
      expect(res.body[0].description).to.be.equal(dummyUser.description)
    })
  }) // end describe('/api/users')
}) // end describe('User routes')
