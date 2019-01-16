const User = require('./user')
const Experience = require('./experience')
const Review = require('./review')
const Order = require('./order')
const Category = require('./category')
const Item = require('./item')

Review.belongsTo(User)

Review.belongsTo(Experience)
Experience.hasMany(Review)

User.hasMany(Order)
Order.belongsTo(User)

// Experience.belongsTo(Category)
// Experience.belongsToMany(Category, {through: 'expcat'})
// Category.belongsToMany(Experience, {through: 'expcat'})

module.exports = {
  User,
  Experience,
  Review,
  Order,
  Category,
  Item
}
