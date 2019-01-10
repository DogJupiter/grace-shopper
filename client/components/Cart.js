import React from 'react'
import CartItemSummary from './Cart-Item-Summary'

let dummyCartItem = [
  {
    id: 1,
    name: 'Jane Hotel After Midnight',
    imageUrl:
      'https://static.urbandaddy.com/uploads/assets/image/articles/standard/cf4eb440aea70a5e56c2453b9e3ce2101debb11e.jpg',
    duration: '3 hours',
    description: 'night out',
    price: 50,
    quantity: 1,
    categoryId: 3
  },
  {
    id: 2,
    name: 'Ballet in Lincoln Center',
    imageUrl:
      'https://buildingupontherock.files.wordpress.com/2012/06/tumblr_l9czdphtbi1qdr4zmo1_500.png',
    duration: '2 hours',
    description: 'Swan Lake',
    price: 80,
    quantity: 2,
    categoryId: 2
  }
]

const Cart = props => {
  return (
    <div className="cart-div">
      <h1>Shopping Cart</h1>
      <div className="individual-items-view">
        <div className="cart-item-header">
          <div>
            <p>Img</p>
          </div>
          <div>
            <p>Name</p>
          </div>
          <div>
            <p>Qty</p>
          </div>
          <div>
            <p>Price</p>
          </div>
          <div>
            <p>Del</p>
          </div>
        </div>
        {/* THERE WILL BE A MAP OF VALS HERE */}
        {dummyCartItem.map(item => {
          return <CartItemSummary key={item.id} cartItem={item} />
        })}
      </div>
      <div className="cart-subtotal">
        <p>
          Subtotal: <input type="text" name="subtotal" />
        </p>
        <p>
          <button type="button">Continue</button>
        </p>
      </div>
    </div>
  )
}

export default Cart
