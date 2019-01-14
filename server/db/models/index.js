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
// Experience.belongsToMany(Order, {through: Item})
// Order.belongsToMany(Experience, {through: Item})
//CG: This will give you methods like order.addExperience()
Item.belongsTo(Experience)
Item.belongsTo(Order)
Order.hasMany(Item) // order_experiences
Experience.belongsToMany(Category, {through: 'expCat'})
Category.belongsToMany(Experience, {through: 'expCat'})
// Order.hasMany(Experience)

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
  Order,
  Category,
  Item
}
