Models
========

experience: {
  id
  name,
  imageUrl,
  duration,
  catergory,
  description,
  reviewId
}

review: {
  id,
  authorId,
  description,
  experienceId
}

User: {
  firstName,
  lastName,
  email,
  password,
  imageUrl
}

Orders: {
  id,
  experiences: []
  userId,
  quantity,
}

Associations
===========
Review.belongsToOne(User)
Reviews.belongsToOne(Experience)
Experience.hasMany(Review)
Order.belongsto(User)

UI
=====
- style:
----------------
"Grey" : #627264
"Gold" : #FCC30A,
"White": #FFFFFF,
"Pink" : #FAE8EB,
"Blue" : #D7FDEC

navbar: grey,
logo/accents: gold,
background: white