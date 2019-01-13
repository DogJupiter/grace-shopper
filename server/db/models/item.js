const Sequelize = require('sequelize')
const db = require('../db')

const Item = db.define('item', {
  quantity: {
    type: Sequelize.INTEGER,
    defaultValue: 0
  },
  cartArray: {
    type: Sequelize.ARRAY(Sequelize.JSON)
  }
})

Item.addQuantity = function() {
  return (this.quantity = this.quantity + 1)
}
Item.prototype.decreaseQuantity = function() {
  this.quantity ? (this.quantity = this.quantity - 1) : (this.quantity = 0)
}

module.exports = Item
