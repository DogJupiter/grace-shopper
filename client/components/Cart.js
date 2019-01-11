import React from 'react'
import CartItemSummary from './Cart-Item-Summary'
import {Grid} from '@material-ui/core'
import {withStyles} from '@material-ui/core/styles'

import {connect} from 'react-redux'
import {getCart} from '../store'

const totalCost = cart => {
  let total = 0
  cart.map(item => (total += item.experience.price * item.quantity))
  return `$${total}.00`
}

class Cart extends React.Component {
  // componentDidMount() {
  //   this.props.getCart()
  // }

  render() {
    let currentCart = this.props.activeCart
    if (!currentCart.length) {
      return <h1>Nothing in cart</h1>
    }

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
          {currentCart.map(item => {
            console.log(item)
            return <CartItemSummary key={item.id} cartItem={item} />
          })}
        </div>
        <div className="cart-subtotal">
          <p>
            Subtotal:{' '}
            <input type="text" name="subtotal" value={totalCost(currentCart)} />
          </p>
          <p>
            <button type="button">Continue</button>
          </p>
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

export default connect(mapStateToProps, mapDispatchToProps)(Cart)

// const styles = theme => ({
//   content: {
//     flexGrow: 1,
//     marginTop: '45px'
//   },
//   loader: {
//     fontSize: '35px',
//     marginTop: '50px',
//     display: 'flex',
//     alignItems: 'center',
//     justifyContent: 'center'
//   }
// })
// const Cart = props => {
//   return (
//     <div className="cart-div">
//       <h1>Shopping Cart</h1>
//       <div className="individual-items-view">
//         <Grid container justify="center" spacing={40}>
//           <div className="cart-item-header">
//             <div>
//               <p>Img</p>
//             </div>
//             <div>
//               <p>Name</p>
//             </div>
//             <div>
//               <p>Qty</p>
//             </div>
//             <div>
//               <p>Price</p>
//             </div>
//             <div>
//               <p>Del</p>
//             </div>
//           </div>
//         </Grid>

//         {/* THERE WILL BE A MAP OF VALS HERE */}
//         {dummyCartItem.map(item => {
//           return <CartItemSummary key={item.id} cartItem={item} />
//         })}
//       </div>
//       <div className="cart-subtotal">
//         <p>
//           Subtotal: <input type="text" name="subtotal" />
//         </p>
//         <p>
//           <button type="button">Continue</button>
//         </p>
//       </div>
//     </div>
//   )
// }
