const Sequelize = require('sequelize')
const db = require('../db')

const Item = db.define('item', {
  quantity: {
    type: Sequelize.INTEGER,
    defaultValue: 0
  }
})

Item.prototype.addQuantity = function() {
  this.quantity = this.quantity + 1
}
Item.prototype.decreaseQuantity = function() {
  this.quantity ? (this.quantity = this.quantity - 1) : (this.quantity = 0)
}

module.exports = Item
