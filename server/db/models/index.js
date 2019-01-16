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

Experience.belongsToMany(Category, {through: 'expCat'})
Category.belongsToMany(Experience, {through: 'expCat'})

module.exports = {
  User,
  Experience,
  Review,
  Order,
  Category,
  Item
}
