const Sequelize = require('sequelize')
const db = require('../db')

const Experience = db.define('experience', {
  //CG: Please also add validations for notEmpty
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  imageUrl: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      isUrl: true
    }
  }, //CG: Food for thought here on making this minutes.
  duration: {
    type: Sequelize.STRING,
    allowNull: false
  },
  category: {
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
  }
})

//CG: You should add quantity her.

module.exports = Experience
