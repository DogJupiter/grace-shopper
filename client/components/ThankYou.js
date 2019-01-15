import React from 'react'
import {Link} from 'react-router-dom'
import CartItemSummary from './Cart-Item-Summary'
import {
  Grid,
  Typography,
  Button,
  Card,
  CardContent,
  Divider
} from '@material-ui/core'
import ContinueIcon from '@material-ui/icons/DirectionsWalk'

import {withStyles} from '@material-ui/core/styles'
import {connect} from 'react-redux'
import {purchaseComplete} from '../store/cart'

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

class ThankYou extends React.Component {
  totalCost(cart) {
    let total = 0
    cart.map(item => (total += item.experience.price * item.quantity))
    return total
  }

  render() {
    const {classes, theme, user} = this.props
    let currentOrder = localStorage.getItem('cart')
    console.log('CURRENT CART----->', currentCart)

    if (!currentCart || currentCart.length < 1) {
      return (
        <Typography className={classes.pageHeader}>
          Thanks for your order!
        </Typography>
      )
    }

    return (
      <div>
        <Typography className={classes.pageHeader}>
          Thanks for your order!
        </Typography>
        <Divider variant="middle" />

        {currentCart.map(item => {
          return (
            <div key={item.experience.id}>
              <CartItemSummary
                cartItem={item}
                cartState={this.props.activeCart}
              />
              <Divider variant="middle" />
            </div>
          )
        })}
        <Card className={classes.cart} align="right">
          <CardContent>
            <Typography className={classes.subtotal} color="textSecondary">
              Subtotal: ${this.totalCost(currentCart)}.00
            </Typography>
            <p>
              {/* {user.id ? (
                <Stripe
                  name="Confirm purchase"
                  description="Test only"
                  amount={this.totalCost(currentCart)}
                />
              ) : ( */}
              <Link to="/checkout">
                <Button
                  variant="outlined"
                  color="secondary"
                  className={classes.button}
                  align="right"
                >
                  Continue &nbsp;<ContinueIcon />
                </Button>
              </Link>
              {/* )} */}
            </p>
          </CardContent>
        </Card>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  activeCart: state.cart,
  user: state.user
})
const mapDispatchToProps = dispatch => ({
  purchaseComplete: id => {
    dispatch(purchaseComplete(id))
  }
})

export default withStyles(styles)(
  connect(mapStateToProps, mapDispatchToProps)(ThankYou)
)
