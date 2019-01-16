const Sequelize = require('sequelize')
const db = require('../db')

const ExpCat = db.define('category', {
  experienceId: {
    type: Sequelize.INTEGER
  },
  categoryId: {
    type: Sequelize.INTEGER
  }
})

module.exports = ExpCat
