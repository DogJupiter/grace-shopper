const User = require('./user')
const Experience = require('./experience')
const Review = require('./review')
const Order = require('./order')

Review.belongsTo(User)
Review.belongsTo(Experience)
Experience.hasMany(Review)
Order.belongsTo(User)
// Order.belongsToMany(Experience, {through: OrderExperience})
// Experience.belongsToMany(Order, {through: OrderExperience})

// Experience.belongsTo(Category, {through: CategoryExperience})
// Category.hasMany(Experience)
// Category.belongsToMany(Experience, {through: CategoryExperience})
// Experience.belongsTo(Category)
// Category.hasOne(Experience)

module.exports = {
  User,
  Experience,
  Review,
  Order
}
