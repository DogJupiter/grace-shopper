import React from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'

import {
  Grid,
  Typography,
  Button,
  withStyles,
  IconButton,
  Card,
  CardMedia
} from '@material-ui/core'

import AddIcon from '@material-ui/icons/AddCircle'
import RemoveIcon from '@material-ui/icons/RemoveCircle'
import DeleteIcon from '@material-ui/icons/DeleteSweep'

import {
  removeFromCart,
  getCart,
  addToCart,
  deleteAllFromCart,
  inStockCheck
} from '../store/cart'
import history from '../history'

const styles = theme => ({
  content: {
    textAlign: 'center',
    justify: 'center',
    alignItems: 'center',
    flexGrow: 1,
    marginTop: '60px'
  },
  cartItemDetails: {
    marginTop: '45px',
    fontSize: '20px',
    fontWeight: 300,
    align: 'center'
  },
  productName: {
    fontFamily: '-apple-system',
    fontSize: '24px',
    fontWeight: 500
  },
  productQty: {
    fontSize: '16px',
    fontWeight: 500
  },
  cartItemImage: {
    marginTop: '30px',
    marginBottom: '30px'
  }
})

class CartItemSummary extends React.Component {
  async handleQtyIncrease() {
    await this.props.checkInventory(
      this.props.cartItem.experience,
      this.props.cartItem.quantity
    )
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
          <Grid container justify="center" spacing={16}>
            <Grid item xs={2} mr={100} px="auto">
              <Card className={classes.cartItemImage}>
                <Link to={`/experiences/${cartItem.id}`}>
                  <CardMedia
                    component="img"
                    alt={cartItem.name}
                    width="200"
                    height="150"
                    image={cartItem.imageUrl}
                  />
                </Link>
              </Card>
            </Grid>
            <Grid item xs={2} mx="auto" px="auto" className={classes.content}>
              <Typography
                style={{color: '#627264'}}
                className={classes.productName}
              >
                {cartItem.name}
              </Typography>
            </Grid>
            <Grid item xs={2} className={classes.content}>
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
  },
  checkInventory: (id, qty) => dispatch(inStockCheck(id, qty))
})

export default withStyles(styles)(
  connect(mapStateToProps, mapDispatchToProps)(CartItemSummary)
)
