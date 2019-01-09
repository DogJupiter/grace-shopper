const Sequelize = require('sequelize')
const db = require('../db')

const Category = db.define('category', {
  category: {
    type: Sequelize.ENUM('food', 'drink', 'entertainment')
  }
})

module.exports = Category
