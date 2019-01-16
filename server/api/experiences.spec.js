const {expect} = require('chai')
const request = require('supertest')
const db = require('../db')
const app = require('../index')

const Experience = db.model('experience')

describe('Experience routes', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('/api/experiences/', () => {
    beforeEach(() => {
      return Experience.create({
        id: 5000,
        imageUrl:
          'http://media.cmgdigital.com/shared/img/photos/2015/09/21/c4/7a/pizza_rat.JPG',
        name: 'Pizza Tasting with Pizza Rat!',
        duration: '4 hours',
        description: 'A SUPER AWESOME EVENT',
        price: 10
      })
    })

    it('GET /api/experiences', async () => {
      const res = await request(app)
        .get('/api/experiences')
        .expect(200)
      expect(res.body).to.be.an('array')
      expect(res.body[0].name).to.be.equal('Pizza Tasting with Pizza Rat!')
    })

    it('GET /api/experiences/:id', async () => {
      const res = await request(app)
        .get('/api/experiences/5000')
        .expect(200)

      expect(res.body).to.be.an('object')
      expect(res.body.name).to.be.equal('Pizza Tasting with Pizza Rat!')
    })
  })

  describe('error handling', () => {
    xit('responds with a 500', async () => {
      await request(app)
        .get('/api/experiences/10000')
        .expect(500)
    })
  })
})
