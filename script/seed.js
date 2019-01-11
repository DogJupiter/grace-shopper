'use strict'

const db = require('../server/db')
const {User, Experience, Review, Order} = require('../server/db/models')

//Experiences Data
const experiences = [
  {
    name: 'Jane Hotel After Midnight',
    imageUrl:
      'https://static.urbandaddy.com/uploads/assets/image/articles/standard/cf4eb440aea70a5e56c2453b9e3ce2101debb11e.jpg',
    duration: '2 hours',
    description: 'night out',
    price: 50,
    quantity: 5,
    tags: ['date', 'movie'],
    inventory: 100
  },
  {
    name: 'Ballet in Lincoln Center',
    imageUrl:
      'https://static.urbandaddy.com/uploads/assets/image/articles/standard/cf4eb440aea70a5e56c2453b9e3ce2101debb11e.jpg',
    duration: '2 hours',
    price: 80,
    description: 'swam lake',
    quantity: 5,
    tags: ['ballet', 'art', 'date'],
    inventory: 100
  },
  {
    name: 'Street Food in Flushing',
    imageUrl:
      'https://static.urbandaddy.com/uploads/assets/image/articles/standard/cf4eb440aea70a5e56c2453b9e3ce2101debb11e.jpg',
    duration: '2 hours',
    price: 40,
    description: 'eat eat eat',
    quantity: 5,
    tags: ['food', 'pizza'],
    inventory: 100
  },
  {
    name: 'Hip Hop Lesson with the Showtime Kids',
    imageUrl:
      'http://spoilednyc.s3.amazonaws.com/wp-content/uploads/2015/02/2showtime.jpg',
    duration: '3 hours',
    price: 60,
    description: `IT'S SHOWTIME EVERYBODY WHAT TIME IS IT SHOWTIME`,
    quantity: 5,
    tags: ['music', 'excersise'],
    inventory: 100
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
    googleId: null,
    isAdmin: false
  },
  {
    firstName: 'Kevin',
    lastName: 'Durant',
    email: 'Kevin@email.com',
    password: '123',
    imageUrl:
      'https://s.newsweek.com/sites/www.newsweek.com/files/styles/full/public/2017/12/05/golden-state-warriors-forward-kevin-durant..jpg',
    googleId: null,
    isAdmin: false
  },
  {
    firstName: 'Stephen',
    lastName: 'Curry',
    email: 'Curry@email.com',
    password: '123',
    imageUrl:
      'http://static1.uk.businessinsider.com/image/56c770d5dd08958e6d8b463c-1190-625/stephen-curry-heres-a-look-at-the-marvelous-life-of-the-greatest-basketball-player-in-the-world.jpg',
    googleId: null,
    isAdmin: false
  },
  {
    firstName: 'Admin',
    lastName: 'TheAdmin',
    email: 'admin@email.com',
    password: '123456',
    imageUrl:
      'http://static1.uk.businessinsider.com/image/56c770d5dd08958e6d8b463c-1190-625/stephen-curry-heres-a-look-at-the-marvelous-life-of-the-greatest-basketball-player-in-the-world.jpg',
    googleId: null,
    isAdmin: true
  }
]

//Review Data
//added userId for testing reviews
const reviews = [
  {
    description: 'I love this experiences!',
    experienceId: 2,
    stars: 4,
    userId: 1
  },
  {
    description: 'I love this experiences!',
    experienceId: 2,
    stars: 5,
    userId: 3
  },
  {
    description: 'I love this experiences!',
    experienceId: 1,
    stars: 3,
    userId: 2
  }
]

//Order Data
const orders = [
  {status: 'created', items: [], userId: 1},
  {
    status: 'completed',
    items: [
      {product: 'dance with princess', quantity: 1, price: 100},
      {product: 'skydiving with princess', quantity: 2, price: 200}
    ],
    userId: 2
  },
  {status: 'created', items: [], userId: 3}
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
