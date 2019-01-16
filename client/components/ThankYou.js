import React from 'react'
import {Link} from 'react-router-dom'
import CartItemSummary from './Cart-Item-Summary'
import {
  Grid,
  Typography,
  Button,
  Card,
  CardContent,
  Divider,
  CardMedia,
  CardHeader
} from '@material-ui/core'

import {withStyles} from '@material-ui/core/styles'
import {connect} from 'react-redux'

import history from '../history'
import {clearCart} from '../store/cart'

const styles = theme => ({
  content: {
    flexGrow: 1,
    marginTop: '50px',
    marginLeft: '50px',
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
  button: {
    justifyContent: 'center',
    justify: 'center',
    alignItems: 'center',
    alignText: 'center'
  }
})

class ThankYou extends React.Component {
  totalCost(cart) {
    let total = 0
    cart.map(item => (total += item.experience.price * item.quantity))
    return total
  }

  handleClick() {
    this.props.clearCart()
    history.push('/')
  }

  render() {
    const {classes, theme, user} = this.props
    let currentOrder = localStorage.getItem('cart')
    let orderObj = JSON.parse(currentOrder)

    return (
      <div>
        <Typography className={classes.pageHeader}>
          Thanks for your order!
        </Typography>
        <Button
          variant="outlined"
          color="secondary"
          className={classes.button}
          onClick={() => this.handleClick()}
        >
          Back to Home
        </Button>
        <Divider variant="middle" />
        <Grid container justify="center" spacing={40}>
          {orderObj.experiences.map(item => {
            console.log(item)
            return (
              <div key={item.experience.id}>
                <Grid item xs={3} className={classes.content}>
                  <Card container justify="center">
                    <Link to={`/experiences/${item.experience.id}`}>
                      <CardHeader
                        title={item.experience.name}
                        subheader={'Quantity: ' + item.quantity}
                      />

                      <CardMedia
                        component="img"
                        alt={item.experience.name}
                        // width="200"
                        // height="150"
                        image={item.experience.imageUrl}
                      />
                    </Link>
                  </Card>
                </Grid>
              </div>
            )
          })}
        </Grid>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  activeCart: state.cart,
  user: state.user
})
const mapDispatchToProps = dispatch => ({
  clearCart: () => {
    dispatch(clearCart())
  }
})

export default withStyles(styles)(
  connect(mapStateToProps, mapDispatchToProps)(ThankYou)
)
