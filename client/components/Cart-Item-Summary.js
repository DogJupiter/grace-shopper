import React from 'react'

const CartItemSummary = props => {
  console.log(props)
  return (
    <div>
      <div className="cart-item">
        <div className="cart-item-img">
          {/* Product Image appears here */}
          <img src={props.cartItem.imageUrl} className="cart-img" />
        </div>
        <div className="cart-item-img">
          {/* Product Name appears here */}
          <p>{props.cartItem.name}</p>
        </div>
        <div className="cart-item-img">
          {/* Product Qty appears here */}
          <form method="post" action="">
            <input
              type="text"
              name="qty"
              id="qty"
              className="qty-update"
              value={props.cartItem.quantity}
              onChange={() => console.log('qty changed')}
            />
            <button type="button">Update</button>
          </form>
        </div>
        <div className="cart-item-img">${props.cartItem.price}.00</div>
        <div className="cart-item-img">
          <h4>button placeholder</h4>
        </div>
      </div>
    </div>
  )
}

export default CartItemSummary
