'use strict'

const db = require('../server/db')
const {
  User,
  Experience,
  Review,
  Order,
  Category,
  OrderExperience,
  CategoryExperience
} = require('../server/db/models')

//Experiences Data
const experiences = [
  {
    name: 'Jane Hotel After Midnight',
    imageUrl:
      'https://static.urbandaddy.com/uploads/assets/image/articles/standard/cf4eb440aea70a5e56c2453b9e3ce2101debb11e.jpg',
    duration: '2 hours',
    price: 50,
    description: 'night out',
    quantity: 50
  },
  {
    name: 'Ballet in Lincoln Center',
    imageUrl:
      'https://static.urbandaddy.com/uploads/assets/image/articles/standard/cf4eb440aea70a5e56c2453b9e3ce2101debb11e.jpg',
    duration: '2 hours',
    price: 80,
    description: 'swam lake',
    quantity: 50
  },
  {
    name: 'Street Food in Flushing',
    imageUrl:
      'https://static.urbandaddy.com/uploads/assets/image/articles/standard/cf4eb440aea70a5e56c2453b9e3ce2101debb11e.jpg',
    duration: '2 hours',
    price: 40,
    description: 'eat eat eat',
    quantity: 50
  },
  {
    name: 'Hip Hop Lesson with the Showtime Kids',
    imageUrl:
      'http://spoilednyc.s3.amazonaws.com/wp-content/uploads/2015/02/2showtime.jpg',
    duration: '3 hours',
    price: 60,
    description: `IT'S SHOWTIME EVERYBODY WHAT TIME IS IT SHOWTIME`,
    quantity: 50
  }
]
//User Data
const users = [
  {
    firstName: 'Koby',
    lastName: 'Bryant',
    email: 'Koby@email.com',
    password: '123',
    imageUrl: 'https://timedotcom.files.wordpress.com/2014/11/458357166.jpg',
    googleId: null
  },
  {
    firstName: 'Kevin',
    lastName: 'Durant',
    email: 'Kevin@email.com',
    password: '123',
    imageUrl:
      'https://s.newsweek.com/sites/www.newsweek.com/files/styles/full/public/2017/12/05/golden-state-warriors-forward-kevin-durant..jpg',
    googleId: null
  },
  {
    firstName: 'Stephen',
    lastName: 'Curry',
    email: 'Curry@email.com',
    password: '123',
    imageUrl:
      'http://static1.uk.businessinsider.com/image/56c770d5dd08958e6d8b463c-1190-625/stephen-curry-heres-a-look-at-the-marvelous-life-of-the-greatest-basketball-player-in-the-world.jpg',
    googleId: null
  }
]

//Review Data
const reviews = [
  {description: 'I love this experiences!', experienceId: 2, stars: 4},
  {description: 'I love this experiences!', experienceId: 2, stars: 5},
  {description: 'I love this experiences!', experienceId: 1, stars: 3}
]

//Order Data
const orders = [
  {status: 'created', quantity: 2},
  {status: 'created', quantity: 1},
  {status: 'created', quantity: 3}
]

//Category Data
const categories = [
  {category: 'entertainment'}, //categoryId = 1
  {category: 'food'}, //categoryId = 2
  {category: 'drink'} //categoryId = 3
]

//OrderExperience JointTable data
const orderExperiences = [
  {orderId: 1, experienceId: 1},
  {orderId: 1, experienceId: 2},
  {orderId: 1, experienceId: 3}
]

//OrderExperience JointTable data
const categoryExperiences = [
  {categoryId: 3, experienceId: 1},
  {categoryId: 1, experienceId: 2},
  {categoryId: 2, experienceId: 3}
]

//CategoryExperience JointTable data
const seed = async () => {
  await db
    .sync({force: true})
    .then(() => {
      return Promise.all(
        experiences.map(experience => {
          return Experience.create(experience)
        })
      )
    })
    .then(() => {
      return Promise.all(
        users.map(user => {
          return User.create(user)
        })
      )
    })
    .then(() => {
      return Promise.all(
        orders.map(order => {
          return Order.create(order)
        })
      )
    })
    .then(() => {
      return Promise.all(
        reviews.map(review => {
          return Review.create(review)
        })
      )
    })
    .then(() => {
      return Promise.all(
        categories.map(category => {
          return Category.create(category)
        })
      )
    })
    .then(() => {
      return Promise.all(
        orderExperiences.map(id => {
          return OrderExperience.create(id)
        })
      )
    })
    .then(() => {
      return Promise.all(
        categoryExperiences.map(id => {
          return CategoryExperience.create(id)
        })
      )
    })
}

// We've separated the `seed` function from the `runSeed` function.
// This way we can isolate the error handling and exit trapping.
// The `seed` function is concerned only with modifying the database.
async function runSeed() {
  console.log('seeding...')
  try {
    await seed()
    console.log('seeding success!')
  } catch (err) {
    console.error(err)
    process.exitCode = 1
  } finally {
    console.log('closing db connection')
    await db.close()
    console.log('db connection closed')
  }
}

// Execute the `seed` function, IF we ran this module directly (`node seed`).
// `Async` functions always return a promise, so we can use `catch` to handle
// any errors that might occur inside of `seed`.
if (module === require.main) {
  runSeed()
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed
