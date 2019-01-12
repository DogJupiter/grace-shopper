import React from 'react'
import {Grid, Typography, Button} from '@material-ui/core'
import {withStyles} from '@material-ui/core/styles'
import Icon from '@material-ui/core/Icon'
import IconButton from '@material-ui/core/IconButton'
import AddIcon from '@material-ui/icons/AddCircle'
import {connect} from 'react-redux'
import {
  removeFromCart,
  getCart,
  addToCart,
  deleteAllFromCart
} from '../store/cart'

import history from '../history'
import {BorderAllRounded} from '@material-ui/icons'

const styles = theme => ({
  content: {
    textAlign: 'center',
    justify: 'center',
    alignItems: 'center',
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
  image: {
    maxWidth: '100%',
    borderRadius: 16,
    boxShadow: 3,
    position: 'left'
  },
  cartItemDetails: {
    fontSize: '20px',
    fontWeight: 300,
    align: 'center'
  },
  cartItemName: {
    spacing: 10
  }
})

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
    const {classes} = this.props
    let cartItem = this.props.cartItem.experience

    return (
      <div>
        <div>
          <Grid container justify="center" spacing={3}>
            <Grid item xs={2} mx="auto" px="auto" className={classes.content}>
              <img src={cartItem.imageUrl} className={classes.image} />
            </Grid>
            <Grid item xs={2} mx="auto" px="auto" className={classes.content}>
              <Typography
                paragraph
                style={{color: '#627264'}}
                className={classes.cartItemDetails}
              >
                {cartItem.name}
              </Typography>
            </Grid>
            <Grid item xs={2} className={classes.content}>
              <Typography paragraph style={{color: '#627264'}}>
                {this.props.cartItem.quantity}
                <p>
                  <IconButton
                    className={classes.icon}
                    color="secondary"
                    onClick={() => this.handleQtyIncrease()}
                  >
                    <AddIcon />
                  </IconButton>
                  <IconButton
                    className={classes.icon}
                    color="secondary"
                    onClick={() => this.handleQtyIncrease()}
                  >
                    remove
                  </IconButton>
                  {/* <button
                    type="button"
                    onClick={() => this.handleQtyIncrease()}
                  >
                    Increase
                  </button>
                </p>
                <p>
                  <button
                    type="button"
                    onClick={() => this.handleQtyDecrease()}
                  >
                    Decrease
                  </button> */}
                </p>
              </Typography>
            </Grid>
            <Grid item xs={2} className={classes.content}>
              <Typography paragraph style={{color: '#627264'}}>
                ${cartItem.price * this.props.cartItem.quantity}.00
              </Typography>
            </Grid>
            <Grid item xs={2} className={classes.content}>
              <Button
                variant="outlined"
                color="secondary"
                className={classes.button}
                onClick={() => this.handleDeleteClick()}
              >
                Delete from Cart
              </Button>
            </Grid>
          </Grid>
        </div>
      </div>

      // <div>
      //   <div className="cart-item">
      //     <div className="cart-item-img">
      //       {/* Product Image appears here */}
      //       <img src={cartItem.imageUrl} className="cart-img" />
      //     </div>
      //     <div className="cart-item-img">
      //       {/* Product Name appears here */}
      //       <p>{cartItem.name}</p>
      //     </div>
      //     <div className="cart-item-img">
      //       {/* Product Qty appears here */}
      //       <p>{this.props.cartItem.quantity}</p>
      //       <p>
      //         <button type="button" onClick={() => this.handleQtyIncrease()}>
      //           Increase
      //         </button>
      //       </p>
      //       <p>
      //         <button type="button" onClick={() => this.handleQtyDecrease()}>
      //           Decrease
      //         </button>
      //       </p>
      //     </div>
      //     <div className="cart-item-img">
      //       ${cartItem.price * this.props.cartItem.quantity}.00
      //     </div>
      //     <div className="cart-item-img">
      //       <button type="button" onClick={() => this.handleDeleteClick()}>
      //         Delete
      //       </button>
      //     </div>
      //   </div>
      // </div>
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

export default withStyles(styles)(
  connect(mapStateToProps, mapDispatchToProps)(CartItemSummary)
)
