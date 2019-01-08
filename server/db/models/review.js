const Sequelize = require('sequelize')
const db = require('../db')

const Review = db.define('review', {
  description: {
    type: Sequelize.TEXT,
    allowNull: false
  }
})

module.exports = Review
