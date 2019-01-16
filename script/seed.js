'use strict'

const db = require('../server/db')
const {
  User,
  Experience,
  Review,
  Order,
  Category
} = require('../server/db/models')

//Experiences Data
const experiences = [
  {
    //food
    //expId 1
    name: 'Pizza Tour with Pizza Rat',
    imageUrl: 'https://i.imgur.com/7VzWLko.jpg',
    duration: '2 hours',
    price: 10,
    description: `Your trip to New York City wouldn't be complete without inhaling a bevvy of Dollar pizza slices from every Sal's Pizza in town. Let a true professional guide you to the hottest spots where you can grab the hottest slices. This Pizza Tour with Pizza Rat will leave you breathless as you explore some of the least-expected pizza joints around town. Tour commences at 3:00am every Sunday in the tunnels between 66th & 72nd Streets on the 1-Train Line. Please dress appropriately. Ticket price does not include cost of any pizza you may purchase or steal on the tour.`,
    inventory: 50,
    category: 'food'
  },
  {
    //drink
    //expId 2
    name: `Saint Mark's Place After Dark`,
    imageUrl: 'https://i.imgur.com/ZQW1N03.jpg',
    duration: '2 hours',
    price: 45,
    description: `There are few places in this city quite like Saint Mark’s Place after 2:00am on a Friday night. Bring your binoculars and booze, and join the party. On this heart-pounding tour, our guides will take you on an adventure as you dodge debaucherous Twenty-Somethings stumbling their way toward final call. Your pulse will race as you knock on every single store-front in search of that speakeasy that everyone’s talking about. Don’t forget to buy a pair of novelty socks! 
    `,
    inventory: 50,
    category: 'drinks'
  },
  {
    //entertainment
    //expId3
    name: 'Hip Hop Lesson with the Showtime Kids',
    imageUrl: 'https://i.imgur.com/WeB146l.jpg',
    duration: '3 hours',
    price: 60,
    description: `IT'S SHOWTIME, EVERYBODY! WHAT TIME IS IT.... You guessed it! SHOWTIME! Be part of every New Yorker's beloved morning ritual! Take advantage of this beNewYork exclusive, and participate in a small-group Subway Dancing Lesson with the Showtime Kids themselves! In just three hours, you'll learn the essentials of breakdancing, pop & locking, and amazing subway pole aerial spins. If time allows, the Kids will also go over Dance Routine Etiquette: Claiming your dance space at peak-time... Avoiding altercations with commuters that you've kicked in the face.... And more! Reservations are limited, so snatch up a ticket before they're gone.`,
    inventory: 50,
    category: 'entertainment'
  },
  {
    //Education
    //expId4
    name: 'Dakota Does CI',
    imageUrl: 'https://i.imgur.com/DnWmupv.jpg',
    duration: '4 hours',
    price: 25,
    description: `Travis got you down? Dakota's to the rescue. Continuous Integration is hard, but Fullstack Professor Dakota will ensure that your Deployment Blues are cleared right up. Three hours of this course will review Github Merge Conflicts, and the remaining hour will cover CI.`,
    inventory: 50,
    category: 'education'
  },
  {
    //food
    //expId 5
    name: 'Times Square Chain Restaurant Crawl',
    imageUrl: 'https://i.imgur.com/xQA0RMB.jpg',
    duration: '6 hours',
    price: 65,
    description: `Whether it's the bottomless breadsticks or the promise of mediocre nachos, chain restaurants hold a special place in all our hearts. Your trip to NYC wouldn't be complete without a bevvy of chain restaurants at which to feast. Admission includes one Applebee's Cocktail and a Novelty Goblet from Dallas BBQ.`,
    inventory: 50,
    category: 'food'
  },
  {
    //Drink
    //expId6
    name: '$12 PBR with Real Williamsburgh Hipsters',
    imageUrl: 'https://i.imgur.com/SrvB8b9.jpg',
    duration: '2 minutes',
    price: 13,
    description: `Come grab a beer with a hipster. But, like, take it with you and leave. Cash & Carry only. No, you can't borrow our moustache wax.`,
    inventory: 50,
    category: 'drink'
  },
  {
    //Entertainment
    //expId7
    name: 'Driving Around in Circles for Fun with BigBus New York',
    imageUrl: 'https://i.imgur.com/mKxIXz6.png',
    duration: '149 hours',
    price: 30,
    description: `Feet swollen from all that city street wandering? Fret no more - join BigBus New York on a hop-on/hop-off city sightseeing extravaganza. You'll drive around in circles, catching sight of all the best that New York City has to offer! Don't blink, or you might miss the action. $30 PROMOTIONAL PERIOD ENDS SOON.`,
    inventory: 50,
    category: 'entertainment'
  },
  {
    //education
    //expId8
    name: 'Grace Hopper Coding BootCamp Tour',
    imageUrl:
      'https://cdn-images-1.medium.com/max/839/1*5e9i0qxE7-d3CGM-5g7Erw.jpeg',
    duration: '1 hour',
    price: 1,
    description: `The Grace Hopper Program at Fullstack Academy is an immersive software engineering program for women in New York City. Are you interested in learning coding? Come join us every Friday at 1 p.m. for an one hour tour and our current students will share their education experience with you.`,
    inventory: 50,
    category: 'education'
  },
  {
    //food
    //expId9
    name: 'Health Inspection Anarchists: The C-Scene',
    imageUrl: 'https://i.imgur.com/LxPoQXN.jpg',
    duration: '12 minutes',
    price: 4.5,
    description: `The New York City Department of Health and Mental Hygiene is a prime example of the Man keeping culinary creativity tamped down. Our restauranteurs will lead you on a tour of the best of the worst-rated restaurants. That's not oil congealed on those vent hoods, it's LOVE. Please arrive fifteen minutes to fill out a waiver releasing us of all liability for your esophageal woes.`,
    inventory: 50,
    category: 'food'
  },

  {
    //Drink
    //expId 10 ***
    name: 'Union Square Drum & Drink',
    imageUrl: 'https://i.imgur.com/3hBOGrS.jpg',
    duration: '4-18 hours',
    price: 10,
    description: `Fight the power and don't drink the Koolaid - grab some brews instead! We've got hippies for days congregating at Union Square, and we're waiting for you. $10 gets you a pair of hemp pants and a single pour of kombucha. Bring your tamborine, man!`,
    inventory: 50,
    category: 'drink'
  },
  {
    //entertainment
    //expId 11
    name:
      'Ride the Elevator Up & Down in a Building Which at One Point in Time Had Some Sort of Historical Significance',
    imageUrl:
      'http://s3files.core77.com/blog/images/2013/11/ESB-HalloweenLightShow-1.jpg',
    duration: '2 hours',
    price: 92,
    description: `Your trip to New York City wouldn't be complete without inhaling a bevvy of Dollar pizza slices from every Sal's Pizza in town. Let a true professional guide you to the hottest spots where you can grab the hottest slices. This Pizza Tour with Pizza Rat will leave you breathless as you explore some of the least-expected pizza joints around town. Tour commences at 3:00am every Sunday in the tunnels between 66th & 72nd Streets on the 1-Train Line. Please dress appropriately. Ticket price does not include cost of any pizza you may purchase or steal on the tour.`,
    inventory: 50,
    category: 'entertainment'
  },
  {
    //education
    //expId 12
    name: `Geoff's Kitty Korner`,
    imageUrl: 'https://i.imgur.com/wFragwe.jpg',
    duration: '2 hour',
    price: 25,
    description: `One of your favorite Fullstack Instructors is back in town, reviewing all that's hot in the Kitty Korner of the world. You'll spend two hours with Geoff and his furry friend Rue, discussing all the news that's fit to print in the Cat World. This event is BYO-cat-nip. No dogs allowed, sorry.`,
    inventory: 25,
    category: 'education'
  }
]
//User Data
const users = [
  {
    // id: 1,
    firstName: 'Koby',
    lastName: 'Bryant',
    email: 'Koby@email.com',
    password: '123',
    imageUrl: 'https://timedotcom.files.wordpress.com/2014/11/458357166.jpg',
    googleId: null
  },
  {
    // id: 2,
    firstName: 'Stephen',
    lastName: 'Curry',
    email: 'Curry@email.com',
    password: '123',
    imageUrl:
      'http://static1.uk.businessinsider.com/image/56c770d5dd08958e6d8b463c-1190-625/stephen-curry-heres-a-look-at-the-marvelous-life-of-the-greatest-basketball-player-in-the-world.jpg',
    googleId: null
  },
  {
    // id: 3,
    firstName: 'Kevin',
    lastName: 'Durant',
    email: 'Kevin@email.com',
    password: '123',
    imageUrl:
      'https://s.newsweek.com/sites/www.newsweek.com/files/styles/full/public/2017/12/05/golden-state-warriors-forward-kevin-durant..jpg',
    googleId: null
  },
  {
    // id: 4,
    firstName: 'Hannah',
    lastName: 'Horvath',
    email: 'Hannah@email.com',
    password: '123',
    imageUrl: 'https://i.imgur.com/7wsjW4V.png',
    googleId: null
  },
  {
    // id: 5,
    firstName: 'Ilana',
    lastName: 'Wexler',
    email: 'Ilana@email.com',
    password: '123',
    imageUrl: 'https://i.imgur.com/5Do6rdj.png',
    googleId: null
  },
  {
    // id: 6,
    firstName: 'Mindy',
    lastName: 'Lahiri',
    email: 'Mindy@email.com',
    password: '123',
    imageUrl: 'https://i.imgur.com/oD94mNi.png',
    googleId: null
  },
  {
    // id: 7,
    firstName: 'Marty',
    lastName: 'Zebra',
    email: 'iLikeToMoveItMoveIt@email.com',
    password: '123',
    imageUrl: 'https://i.imgur.com/Becyu42.jpg',
    googleId: null
  },
  {
    firstName: 'Guest',
    lastName: 'User',
    email: 'BLAH@email.com',
    password: '123',
    imageUrl: 'https://i.imgur.com/yIgo5QE.jpg',
    googleId: null
  }
]

//Review Data
//added userId for testing reviews
const reviews = [
  {
    description:
      'I kicked my mom in the face. She was not happy. Do not recommend.',
    experienceId: 1,
    stars: 1,
    userId: 2
  },
  {
    description: `I'm not entirely sure that I'm a better dancer after taking this lesson, but at least I can say that I'm able to hang upside down from the ceiling handlebars. Never know when that might come in handy.`,
    experienceId: 1,
    stars: 4,
    userId: 4
  },
  {
    description: `I lost a shoe while attempting a triple back handspring down the aisle, and I haven't seen it since. New York, I love you, but you're bringing me down.`,
    experienceId: 1,
    stars: 2,
    userId: 5
  },
  {
    description: `The "hop-off" part of the experience was a lie. I hopped on, and they wouldn't let me off. It's 149 hours later, and I'm very hungry. Although, on the plus side, $30 for a 149-hour experience is a top-notch deal. But, if I could do it all over again, I wouldn't.`,
    experienceId: 2,
    stars: 3,
    userId: 6
  },
  {
    description: `I LOVE GOING AROUND IN CIRCLES IT'S THE BEST. 10/10 WOULD RECOMMEND.`,
    experienceId: 2,
    stars: 5,
    userId: 1
  },
  {
    description: `It was all fun and games until somebody mentioned Pineapple. Can't we all just get along!?`,
    experienceId: 3,
    stars: 5,
    userId: 7
  },
  {
    description: `I went into this excursion a little bit hesitant. I mean - isn't walking on the subway tracks illegal and dangerous? But let me tell you. Pizza Rat know what he's doing. This guys knows his slices! I walked away from this experience with a newfound appreciation of pizza and just a tiny misdemeanor charge!`,
    experienceId: 3,
    stars: 5,
    userId: 2
  }
]

//Order Data
const orders = [
  {status: 'created', items: [], userId: 2, subtotal: 0},
  {status: 'created', items: [], userId: 1, subtotal: 0},
  {status: 'created', items: [], userId: 3, subtotal: 0}
]

//Category Data
const categories = [
  {type: 'food'},
  {type: 'drink'},
  {type: 'entertainment'},
  {type: 'education'}
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
}

// We've separated the `seed` function from the `runSeed` function.
// This way we can isolate the error handling and exit trapping.
// The `seed` function is concerned  only with modifying the database.
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
