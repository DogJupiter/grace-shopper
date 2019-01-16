import React from 'react'
import {connect} from 'react-redux'
import Stripe from './Stripe'
import {Link} from 'react-router-dom'
import {getCart, makeNewOrder} from '../store/cart'
import {Grid, Typography} from '@material-ui/core'
import {
  withStyles,
  MuiThemeProvider,
  createMuiTheme
} from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import PropTypes from 'prop-types'
const styles = theme => ({
  root: {
    flexGrow: 1
  },
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginTop: 30
  },
  center: {
    alignItems: 'center'
  },
  green: {
    color: '#627264'
  },
  margin: {
    marginTop: 100
  }
})
const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#627264'
    }
  },
  typography: {useNextVariants: true}
})

//Guest Checkout
class Checkout extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      address: '',
      instruction: ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.totalCost = this.totalCost.bind(this)
  }
  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
    console.log(this.state)
  }

  handleSubmit(event) {
    event.preventDefault()
    let newOrder = {
      status: 'created',
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      email: this.state.email,
      address: this.state.address,
      instruction: this.state.instruction,
      subtotal: this.totalCost(this.props.activeCart.experiences),
      userId: this.props.user.id || null,

      items: this.props.activeCart.experiences.map(item => {
        let itemObj = {
          experience: item.experience.name,
          quantity: item.quantity,
          price: item.experience.price
        }

        return itemObj
      })
    }

    this.props.makeNewOrder(newOrder)
  }

  totalCost(cart) {
    console.log('this is the current cart', cart)
    let total = 0
    cart.forEach(item => {
      total += item.experience.price * item.quantity
    })
    return total
  }

  render() {
    const {user, classes} = this.props
    let currentCart = this.props.activeCart.experiences

    return (
      <div className={classes.container}>
        <Grid className={classes.container}>
          {!this.props.user.id ? (
            <div className={classes.container}>
              <Grid item xs={6}>
                <Typography variant="h4" styles={{textAlign: 'center'}}>
                  {' '}
                  COMPLETE YOUR ORDER
                </Typography>
              </Grid>

              <Grid item xs={6}>
                <Typography variant="h6" styles={{textAlign: 'center'}}>
                  New Customer
                </Typography>
                <Link to="/login">Already have an account?</Link>
                <Typography variant="body1" style={{marginTop: 10}}>
                  You can complete your purchase as a guest and will be able to
                  sign up and save your details for future purchases at the end
                  of the order process
                </Typography>
              </Grid>
            </div>
          ) : (
            <Grid item xs={12} className={classes.container}>
              <Typography variant="h4" styles={{textAlign: 'center'}}>
                COMPLETE YOUR ORDER
              </Typography>
            </Grid>
          )}
          <Grid item>
            <MuiThemeProvider theme={theme}>
              <form className={classes.container} onSubmit={this.handleSubmit}>
                <Grid item xs={6}>
                  <TextField
                    required
                    label="First Name"
                    id="outlined-full-width"
                    style={{margin: 8, width: '95%'}}
                    margin="normal"
                    variant="outlined"
                    type="text"
                    name="firstName"
                    InputLabelProps={{
                      shrink: true
                    }}
                    placeholder="First Name"
                    onChange={this.handleChange}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    required
                    id="outlined-full-width"
                    label="Last Name"
                    style={{margin: 8, width: '95%'}}
                    margin="normal"
                    variant="outlined"
                    type="text"
                    name="lastName"
                    InputLabelProps={{
                      shrink: true
                    }}
                    placeholder="Last Name"
                    onChange={this.handleChange}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    required
                    id="outlined-full-width"
                    label="Email"
                    style={{margin: 8, width: '95%'}}
                    margin="normal"
                    variant="outlined"
                    type="email"
                    name="email"
                    helperText="We will send confirmation to this email"
                    InputLabelProps={{
                      shrink: true
                    }}
                    placeholder="Email"
                    onChange={this.handleChange}
                  />
                </Grid>

                <Grid item xs={6}>
                  <TextField
                    required
                    id="outlined-full-width"
                    label="Billing address"
                    style={{margin: 8, width: '95%'}}
                    margin="normal"
                    variant="outlined"
                    type="text"
                    name="address"
                    InputLabelProps={{
                      shrink: true
                    }}
                    placeholder="Billing Address"
                    onChange={this.handleChange}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    id="outlined-full-width"
                    label="Special instructions"
                    style={{margin: 8, width: '95%'}}
                    margin="normal"
                    variant="outlined"
                    type="text"
                    name="instruction"
                    InputLabelProps={{
                      shrink: true
                    }}
                    placeholder="Special instructions"
                    onChange={this.handleChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Typography
                    variant="body"
                    style={{
                      textTransform: 'uppercase',
                      textAlign: 'center',
                      paddingBottom: 20
                    }}
                  >
                    Your total is ${this.totalCost(currentCart)}.00
                  </Typography>
                  <Grid item xs={12} className={classes.container}>
                    <Stripe
                      name="Confirm purchase"
                      description="Test only"
                      amount={this.totalCost(currentCart)}
                    />
                  </Grid>
                </Grid>
              </form>
            </MuiThemeProvider>
          </Grid>
        </Grid>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    activeCart: state.cart,
    user: state.user
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getCart: () => {
      dispatch(getCart())
    },
    makeNewOrder: order => dispatch(makeNewOrder(order))
  }
}

export default withStyles(styles)(
  connect(mapStateToProps, mapDispatchToProps)(Checkout)
)

Checkout.propTypes = {
  classes: PropTypes.object.isRequired
}
