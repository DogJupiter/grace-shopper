const Sequelize = require('sequelize')
const db = require('../db')

const Experience = db.define('experience', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  imageUrl: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      isUrl: true
    }
  },
  duration: {
    type: Sequelize.STRING,
    allowNull: false
  },
  description: {
    type: Sequelize.TEXT
  },
  price: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      min: 0
    }
  },
  inventory: {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 1,
    validate: {
      min: 0
    }
  },
  category: {
    type: Sequelize.STRING,
    defaultValue: 4
  }
})

Experience.prototype.decreaseInventory = function(num) {
  this.inventory = this.inventory - num
}

Experience.prototype.setCat = function(catNum) {
  this.categoryId = catNum
}
module.exports = Experience
