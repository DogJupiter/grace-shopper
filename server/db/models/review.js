const Sequelize = require('sequelize')
const db = require('../db')

const Review = db.define('review', {
  description: {
    type: Sequelize.TEXT,
    allowNull: false,
    validate: {
      len: {
        args: 50,
        message: 'review text must be at least 50 characters in length'
      }
    }
  }
})

module.exports = Review
