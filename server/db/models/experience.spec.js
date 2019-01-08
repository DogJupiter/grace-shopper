const {expect} = require('chai')
const db = require('../index')
const Experience = db.model('experience')

describe('Experience model', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })
})

let cheapFunThing
beforeEach(function() {
  cheapFunThing = Experience.build({
    name: 'Jane Hotel After Midnight',
    imageUrl:
      'https://static.urbandaddy.com/uploads/assets/image/articles/standard/cf4eb440aea70a5e56c2453b9e3ce2101debb11e.jpg',
    category: 'drink',
    duration: '2 hours',
    price: 50,
    description: 'night out'
  })
})

describe('Experience', function() {
  it('includes all the fields', function() {
    return cheapFunThing.save().then(function(savedExperience) {
      expect(savedExperience.name).to.equal('Jane Hotel After Midnight')
      expect(savedExperience.imageUrl).to.equal(
        'https://static.urbandaddy.com/uploads/assets/image/articles/standard/cf4eb440aea70a5e56c2453b9e3ce2101debb11e.jpg'
      )
      expect(savedExperience.category).to.equal('drink')
      expect(savedExperience.duration).to.equal('2 hour')
      expect(savedExperience.description).to.equal('night out')
      expect(savedExperience.price).to.equal(50)
    })
  })
})
