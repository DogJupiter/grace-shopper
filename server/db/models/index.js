const User = require('./user')
const Experience = require('./experience')
const Review = require('./review')
const Order = require('./order')
const Category = require('./category')

Review.belongsTo(User)
Review.belongsTo(Experience)
Experience.hasMany(Review)
User.hasMany(Order)
Order.belongsTo(User)

// Experience.belongsTo(Category, {through: CategoryExperience})
// Category.hasMany(Experience)
// Category.belongsToMany(Experience, {through: CategoryExperience})
// Experience.belongsTo(Category)
// Category.hasOne(Experience)

module.exports = {
  User,
  Experience,
  Review,
  Order,
  Category
}
