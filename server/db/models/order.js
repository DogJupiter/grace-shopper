const Sequelize = require('sequelize')
const db = require('../db')

const Order = db.define('order', {
  // quantity: {
  //   // structure: {product: {Product}, quantity: X, price: X}
  //   type: Sequelize.ARRAY(Sequelize.JSON),
  //   allowNull: false
  // }
  quantity: {
    type: Sequelize.INTEGER,
    allowNull: false
  }
})

/* CG: What is the difference between cart and order?
    Order      <-->      Experiences
            Order_Experiences (orderId, experienceId) --> quantity.

*/

module.exports = Order
