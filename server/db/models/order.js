const Sequelize = require('sequelize')
const db = require('../db')

const Order = db.define('order', {
  status: {
    type: Sequelize.ENUM('created', 'completed'),
    defaultValue: 'created',
    allowNull: false
  }, //if status === completed, it is ORDER, else it is CART
  items: {
    // each item will be represented as an {experience: {experience}, quantity:quantity, price:price}
    type: Sequelize.ARRAY(Sequelize.JSON),
    allowNull: false
  },
  subTotal: {
    type: Sequelize.VIRTUAL,
    get: function() {
      return this.items && this.items.length
        ? this.items.reduce((accum, item) => accum + item.q * item.p, 0)
        : 0
    }
  },
  //if the customer has someone else's information - not his default User information
  customersFirstName: {
    type: Sequelize.STRING
  },
  customersLastName: {
    type: Sequelize.STRING
  },
  customersAddress: {
    type: Sequelize.STRING
  },
  customersEmail: {
    type: Sequelize.STRING
  },
  customersInstruction: {
    type: Sequelize.TEXT
  }
})

/* CG:
1. What is the difference between cart and order?
2. Order      <-->      Experiences
      Order_Experiences (orderId, experienceId) --> quantity.

*/

module.exports = Order
