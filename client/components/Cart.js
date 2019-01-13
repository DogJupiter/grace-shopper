import React from 'react'
import CartItemSummary from './Cart-Item-Summary'
import {
  Grid,
  Typography,
  Button,
  Card,
  CardContent,
  List,
  ListItem,
  Divider
} from '@material-ui/core'
import ContinueIcon from '@material-ui/icons/DirectionsWalk'

import {withStyles} from '@material-ui/core/styles'
// import Card from '@material-ui/core/Card';
// import CardActions from '@material-ui/core/CardActions';
// import CardContent from '@material-ui/core/CardContent';

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
  pageHeader: {
    fontSize: '35px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '50px',
    fontFamily: '-apple-system'
  },
  cartHeader: {
    font: 'Avant Garde',
    fontSize: '16px',
    textAlign: 'center',
    fontWeight: 300
  },
  singleItemView: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  subtotal: {
    fontSize: '15px',
    fontWeight: 500
  }
})

class Cart extends React.Component {
  totalCost(cart) {
    let total = 0
    cart.map(item => (total += item.experience.price * item.quantity))
    return `$${total}.00`
  }

  render() {
    const {classes, theme} = this.props
    let currentCart = this.props.activeCart.experiences
    if (!currentCart || currentCart.length < 1) {
      return (
        <Typography className={classes.pageHeader}>
          Nothing in your cart...
        </Typography>
      )
    }

    return (
      <div>
        <Typography className={classes.pageHeader}>Shopping Cart</Typography>
        <Divider variant="middle" />

        <div>
          <Grid container justify="center" spacing={8}>
            <Grid item xs={2} className={classes.content}>
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
          return (
            <div key={item.experience.id}>
              {/* <ListItem> */}
              <CartItemSummary
                cartItem={item}
                cartState={this.props.activeCart}
              />
              <Divider variant="middle" />
            </div>
          )
        })}
        {/* CART SUBTOTAL IS CALCULATED HERE */}
        <Card className={classes.cart} align="right">
          <CardContent>
            <Typography className={classes.subtotal} color="textSecondary">
              Subtotal: {this.totalCost(currentCart)}
            </Typography>
            <p>
              <Button
                variant="outlined"
                color="secondary"
                className={classes.button}
                onClick={console.log('leads to checkout')}
                align="right"
              >
                Continue &nbsp;<ContinueIcon />
              </Button>
            </p>
          </CardContent>
        </Card>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  activeCart: state.cart
})
const mapDispatchToProps = dispatch => ({
  getCart: () => {
    dispatch(getCart())
  }
})

export default withStyles(styles)(
  connect(mapStateToProps, mapDispatchToProps)(Cart)
)
