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
    },
    defaultValue:
      'http://spoilednyc.s3.amazonaws.com/wp-content/uploads/2015/02/2showtime.jpg'
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
      max: 10, //assume each class will be filled by 100 attendance
      min: 0
    }
  },
  tags: {
    type: Sequelize.ARRAY(Sequelize.STRING),
    defaultValue: []
  },
  inventory: {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 1,
    validate: {
      min: 0
    }
  }
})

Experience.prototype.decreaseInventory = function(num) {
  this.inventory = this.inventory - num
}

module.exports = Experience
