import React from 'react'
import {connect} from 'react-redux'

class CartItemSummary extends React.Component {
  handleQtyUpdate() {
    //check quantity of item in the cart, change it by what's in the box
    const newAmt = event.target.content.value
    console.log('NEW AMOUNT---->', newAmt)
    this.props.cartItem.quantity = newAmt
  }
  render() {
    let cartItem = this.props.cartItem.experience
    return (
      <div>
        <div className="cart-item">
          <div className="cart-item-img">
            {/* Product Image appears here */}
            <img src={cartItem.imageUrl} className="cart-img" />
          </div>
          <div className="cart-item-img">
            {/* Product Name appears here */}
            <p>{cartItem.name}</p>
          </div>
          <div className="cart-item-img">
            {/* Product Qty appears here */}
            <form method="post" action="">
              <input
                type="text"
                name="qty"
                id="qty"
                className="qty-update"
                value={this.props.cartItem.quantity}
                // onChange={() => console.log('qty changed')}
              />
              <button type="button">Update</button>
            </form>
          </div>
          <div className="cart-item-img">
            ${cartItem.price * this.props.cartItem.quantity}.00
          </div>
          <div className="cart-item-img">
            <h4>button placeholder</h4>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  activeCart: state.cart
})
const mapDispatchToProps = dispatch => ({
  getCart: () => dispatch(getCart())
})

export default connect(mapStateToProps, mapDispatchToProps)(CartItemSummary)
