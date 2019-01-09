/* global describe beforeEach it */

const {expect} = require('chai')
const request = require('supertest')
const db = require('../db')
const app = require('../index')
const Experience = db.model('experience')

describe.only('Experience routes', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('/api/experiences/', () => {
    beforeEach(() => {
      return Experience.create({
        id: 9999,
        imageUrl:
          'http://media.cmgdigital.com/shared/img/photos/2015/09/21/c4/7a/pizza_rat.JPG',
        name: 'Pizza Tasting with Pizza Rat!',
        duration: '4 hours', // this may change - what's the column type?
        category: 'Food',
        description: 'A SUPER AWESOME EVENT',
        price: 9999
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
        .get('/api/experiences/9999')
        .expect(200)

      expect(res.body).to.be.an('object')
      expect(res.body.name).to.be.equal('Pizza Tasting with Pizza Rat!')
    })
  }) // end describe('/api/users')
}) // end describe('User routes')
