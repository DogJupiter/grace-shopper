const Sequelize = require('sequelize')
const db = require('../db')

const Order = db.define('order', {
  status: {
    type: Sequelize.ENUM('created', 'completed'),
    defaultValue: 'created',
    allowNull: false
  }, //if status === completed, it is ORDER, else it is CART
  sessionId: {
    type: Sequelize.STRING,
    unique: true
  }, //this is for CART
  items: {
    // each item will be represented as an {experience: {experience}, quantity:quantity, price:price}
    type: Sequelize.ARRAY(Sequelize.JSON),
    allowNull: false
  },
  subtotal: {
    type: Sequelize.INTEGER,
    allowNull: false
  },

  firstName: {
    type: Sequelize.STRING
  },
  lastName: {
    type: Sequelize.STRING
  },
  address: {
    type: Sequelize.STRING
  },
  email: {
    type: Sequelize.STRING
  },
  instruction: {
    type: Sequelize.TEXT
  }
})

module.exports = Order

// Order.prototype.checkInventory = function (qty){
//   return (this.inventory-qty>=0)
// }
