import React from 'react'
import {connect} from 'react-redux'
import Stripe from './Stripe'
import {Link, Redirect} from 'react-router-dom'
import {getCart, makeNewOrder} from '../store/cart'
import {Grid, Typography} from '@material-ui/core'
import {withStyles} from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'

const styles = theme => ({
  root: {
    flexGrow: 1
  },
  paper: {
    padding: theme.spacing.unit * 2,
    margin: 'auto',
    maxWidth: '100vw'
  },
  image: {
    height: '100%',
    width: '100%',
    objectFit: 'cover'
  },
  img: {
    margin: 'auto',
    display: 'block',
    maxWidth: '100%',
    maxHeight: '100%'
  },
  icons: {
    align: 'center'
  },
  avatar: {
    margin: 10
  },
  header: {
    fontSize: '48px',
    textTransform: 'uppercase'
  },
  uppercase: {
    textTransform: 'uppercase'
  },
  text: {
    fontSize: 18
  },
  margin: {
    marginTop: 100
  },
  //form
  container: {
    display: 'flex',
    flexWrap: 'wrap'
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit
  },
  dense: {
    marginTop: 16
  },
  menu: {
    width: 200
  }
})

//Guest Checkout
class Checkout extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      firstName: '',
      lastName: '',
      email: ''
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
    cart.map(item => (total += item.experience.price * item.quantity))
    return total
  }

  render() {
    const {firstName, lastName, email} = this.state
    const {user} = this.props
    let currentCart = this.props.activeCart.experiences

    // if (!user.id) {
    return (
      <Grid container spacing={24}>
        <Grid item xs={12} sm={6}>
          <Typography variant="h6">New Customer</Typography>
          <Link to="/login">Already have an account?</Link>
          <Typography variant="body1" style={{marginTop: 10}}>
            You can complete your purchase as a guest and will be able to sign
            up and save your details for future purchases at the end of the
            order process
          </Typography>
          <form onSubmit={this.handleSubmit}>
            <TextField
              id="outlined-full-width"
              label="First Name"
              style={{margin: 8}}
              margin="normal"
              variant="outlined"
              type="text"
              name="firstName"
              fullWidth
              InputLabelProps={{
                shrink: true
              }}
              onChange={this.handleChange}
            />
            <TextField
              id="outlined-full-width"
              label="Last Name"
              style={{margin: 8}}
              margin="normal"
              variant="outlined"
              type="text"
              name="lastName"
              fullWidth
              InputLabelProps={{
                shrink: true
              }}
              onChange={this.handleChange}
            />
            <TextField
              id="outlined-full-width"
              label="Email"
              style={{margin: 8}}
              margin="normal"
              variant="outlined"
              type="text"
              name="email"
              helperText="We will send confirmation to this email"
              fullWidth
              InputLabelProps={{
                shrink: true
              }}
              onChange={this.handleChange}
            />
            <Stripe
              name="Confirm purchase"
              description="Test only"
              amount={this.totalCost(currentCart)}
              cartInfo={currentCart}
            />
          </form>
        </Grid>

        <Grid item xs={12} sm={6}>
          <Typography variant="h6">
            Total:${this.totalCost(currentCart)}.00
          </Typography>
        </Grid>
      </Grid>
    )
    // } else {
    //   return <Redirect to="/cart" />
    // }
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
