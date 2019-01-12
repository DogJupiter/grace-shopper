import React from 'react'
import {connect} from 'react-redux'
import {
  removeFromCart,
  getCart,
  addToCart,
  deleteAllFromCart
} from '../store/cart'

import history from '../history'

class CartItemSummary extends React.Component {
  handleQtyIncrease() {
    this.props.addToCart(this.props.cartItem.experience)
    history.push('/cart')
  }

  handleQtyDecrease() {
    this.props.removeFromCart(this.props.cartItem.experience)
    history.push('/cart')
  }

  handleDeleteClick() {
    this.props.deleteAllFromCart(this.props.cartItem.experience)
    history.push('/cart')
  }
  render() {
    let cartItem = this.props.cartItem.experience
    // console.log('CART ITEM', cartItem)

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
            <p>{this.props.cartItem.quantity}</p>
            <p>
              <button type="button" onClick={() => this.handleQtyIncrease()}>
                Increase
              </button>
            </p>
            <p>
              <button type="button" onClick={() => this.handleQtyDecrease()}>
                Decrease
              </button>
            </p>
          </div>
          <div className="cart-item-img">
            ${cartItem.price * this.props.cartItem.quantity}.00
          </div>
          <div className="cart-item-img">
            <button type="button" onClick={() => this.handleDeleteClick()}>
              Delete
            </button>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  activeCart: state.cart
})
const mapDispatchToProps = (dispatch, ownProps) => ({
  getCart: () => dispatch(getCart()),
  removeFromCart: exp => {
    dispatch(removeFromCart(exp))
  },
  addToCart: exp => {
    dispatch(addToCart(exp))
  },
  deleteAllFromCart: exp => {
    dispatch(deleteAllFromCart(exp))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(CartItemSummary)
