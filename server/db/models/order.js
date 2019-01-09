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
  quantity: {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 1
  },
  totalPrice: {
    type: Sequelize.INTEGER,
    defaultValue: 0,
    validate: {
      min: 0
    }
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

/* CG:
1. What is the difference between cart and order?
2. Order      <-->      Experiences
      Order_Experiences (orderId, experienceId) --> quantity.

*/

module.exports = Order
