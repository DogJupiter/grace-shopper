const Sequelize = require('sequelize')
const db = require('../db')

const Item = db.define('item', {
  quantity: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  price: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  experienceName: {
    type: Sequelize.STRING,
    allowNull: false
  }
})

// Item.prototype.addQuantity = function() {
//   if (this.quantity === 5) this.quantity = 5
//   this.quantity = this.quantity + 1
// }
// Item.prototype.decreaseQuantity = function() {
//   this.quantity ? (this.quantity = this.quantity - 1) : (this.quantity = 0)
// }

module.exports = Item
