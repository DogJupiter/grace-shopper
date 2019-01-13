import React from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'

import {
  Grid,
  Typography,
  Button,
  withStyles,
  IconButton
} from '@material-ui/core'

import AddIcon from '@material-ui/icons/AddCircle'
import RemoveIcon from '@material-ui/icons/RemoveCircle'
import DeleteIcon from '@material-ui/icons/DeleteSweep'

import {
  removeFromCart,
  getCart,
  addToCart,
  deleteAllFromCart
} from '../store/cart'
import history from '../history'

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
  },
  productQty: {
    fontSize: '16px',
    fontWeight: 500
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
          <Grid container justify="center" spacing={8}>
            <Grid item xs={2} mx="auto" px="auto" className={classes.content}>
              {/* CART ITEM IMAGE HERE */}
              <Link to={`/experiences/${cartItem.id}`}>
                <img src={cartItem.imageUrl} className={classes.image} />
              </Link>
            </Grid>
            <Grid item xs={2} mx="auto" px="auto" className={classes.content}>
              {/* CART ITEM NAME HERE */}
              <Typography
                style={{color: '#627264'}}
                className={classes.cartItemDetails}
              >
                {cartItem.name}
              </Typography>
            </Grid>
            <Grid item xs={2} className={classes.content}>
              {/* CART ITEM QUANTITY HERE */}
              <Typography
                style={{color: '#627264'}}
                className={classes.productQty}
              >
                {this.props.cartItem.quantity}
                <br />
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
                  onClick={() => this.handleQtyDecrease()}
                >
                  <RemoveIcon />
                </IconButton>
              </Typography>
            </Grid>
            <Grid item xs={2} className={classes.content}>
              {/* CART ITEM PRICE HERE */}
              <Typography
                style={{color: '#627264'}}
                className={classes.productQty}
              >
                ${cartItem.price * this.props.cartItem.quantity}.00
              </Typography>
            </Grid>
            <Grid item xs={2} className={classes.content}>
              {/* CART ITEM DELETE BUTTON HERE */}
              <Button
                variant="outlined"
                color="secondary"
                className={classes.button}
                onClick={() => this.handleDeleteClick()}
              >
                Delete &nbsp; &nbsp; <DeleteIcon />
              </Button>
            </Grid>
          </Grid>
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

export default withStyles(styles)(
  connect(mapStateToProps, mapDispatchToProps)(CartItemSummary)
)
