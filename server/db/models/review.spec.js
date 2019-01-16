const {expect} = require('chai')
const db = require('../index')
const Review = db.model('review')

describe('Experience model', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })
})

let funnyReview
beforeEach(function() {
  funnyReview = Review.build({
    description:
      "I lost a shoe while attempting a triple back handspring down the aisle, and I haven't seen it since.New York, I love you, but you're bringing me down.",
    stars: 2
  })
})

describe('Review', function() {
  it('includes all the fields', function() {
    return funnyReview.save().then(function(savedreview) {
      expect(savedreview.description).to.equal(
        "I lost a shoe while attempting a triple back handspring down the aisle, and I haven't seen it since.New York, I love you, but you're bringing me down."
      )
      expect(savedreview.stars).to.equal(2)
    })
  })

  it('requires `stars`', async () => {
    funnyReview.stars = null

    let result, error
    try {
      result = await funnyReview.validate()
    } catch (err) {
      error = err
    }

    if (result) throw Error('validation should fail when stars is null')

    expect(error).to.be.an.instanceOf(Error)
  })
})
