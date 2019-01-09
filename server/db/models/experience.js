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
  //CG: thought here on making this minutes.
  /* //Wenyi added a get method
  duration:{
    type: Sequelize.INTEGER,
    get: function(hour){
       let unformatedDuration = this.getDataValue(hour);
       let formatedDuration = unformatedDuration * 60;
       return formatedDuration
    }
  }
 */
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
  quantity: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      max: 100, //assume each class will be filled by 100 attendance
      min: 0
    }
  }
})

module.exports = Experience
