import React from 'react'
import CartItemSummary from './Cart-Item-Summary'
import {Grid, Typography} from '@material-ui/core'
import {withStyles} from '@material-ui/core/styles'

import {connect} from 'react-redux'
import {getCart} from '../store/cart'

const styles = theme => ({
  content: {
    flexGrow: 1,
    marginTop: '45px'
  },
  loader: {
    fontSize: '35px',
    marginTop: '50px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  cartHeader: {
    font: 'Avant Garde',
    fontSize: '20px',
    textAlign: 'center',
    fontWeight: 600
  }
})

class Cart extends React.Component {
  // componentDidMount() {
  //   this.props.getCart()
  // }
  totalCost(cart) {
    let total = 0
    cart.map(item => (total += item.experience.price * item.quantity))
    return `$${total}.00`
  }

  render() {
    const {classes} = this.props
    let currentCart = this.props.activeCart.experiences
    if (!currentCart || currentCart.length < 1) {
      return <h1>Nothing in cart</h1>
    }

    return (
      <div>
        <h1>Shopping Cart</h1>
        <div>
          <Grid container justify="center" spacing={3}>
            <Grid item xs={2} className={classes.content}>
              {/* <Typography
                paragraph
                style={{color: '#627264'}}
                className={classes.cartHeader}
              >
                Image
              </Typography> */}
              <div />
            </Grid>
            <Grid item xs={2} className={classes.content}>
              <Typography
                paragraph
                style={{color: '#627264'}}
                className={classes.cartHeader}
              >
                Experience
              </Typography>
            </Grid>
            <Grid item xs={2} className={classes.content}>
              <Typography
                paragraph
                style={{color: '#627264'}}
                className={classes.cartHeader}
              >
                Quantity
              </Typography>
            </Grid>
            <Grid item xs={2} className={classes.content}>
              <Typography
                paragraph
                style={{color: '#627264'}}
                className={classes.cartHeader}
              >
                Price
              </Typography>
            </Grid>
            <Grid item xs={2} className={classes.content}>
              <div />
            </Grid>
          </Grid>
        </div>
        {/* THERE WILL BE A MAP OF VALS HERE */}
        {currentCart.map(item => {
          console.log(item)
          return (
            <CartItemSummary
              key={item.experience.id}
              cartItem={item}
              cartState={this.props.activeCart}
            />
          )
        })}
        {/* </div> */}
        <div className="cart-subtotal">
          <p>
            Subtotal:{' '}
            <input
              type="text"
              name="subtotal"
              value={this.totalCost(currentCart)}
            />
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
const mapDispatchToProps = (dispatch, ownProps) => ({
  getCart: () => {
    dispatch(getCart())
    // ownProps.history.push('/cart')
  }
})

export default withStyles(styles)(
  connect(mapStateToProps, mapDispatchToProps)(Cart)
)

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
