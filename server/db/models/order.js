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

module.exports = Order
