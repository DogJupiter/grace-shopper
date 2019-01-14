import React from 'react'
import {connect} from 'react-redux'
import Stripe from './Stripe'
import {Link} from 'react-router-dom'
import {getCart} from '../store/cart'
/* Material Ui style*/
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
  constructor() {
    super()
    this.state = {
      firstName: '',
      lastName: '',
      email: ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }
  handleSubmit(event) {
    event.preventDefault()
  }
  totalCost(cart) {
    let total = 0
    cart.map(item => (total += item.experience.price * item.quantity))
    return `$${total}.00`
  }
  render() {
    const {firstName, lastName, email} = this.state
    let currentCart = this.props.activeCart.experiences
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
              name={firstName}
              fullWidth
              InputLabelProps={{
                shrink: true
              }}
            />
            <TextField
              id="outlined-full-width"
              label="Last Name"
              style={{margin: 8}}
              margin="normal"
              variant="outlined"
              type="text"
              name={lastName}
              fullWidth
              InputLabelProps={{
                shrink: true
              }}
            />
            <TextField
              id="outlined-full-width"
              label="Email"
              style={{margin: 8}}
              margin="normal"
              variant="outlined"
              type="text"
              name={email}
              helperText="We will send confirmation to this email"
              fullWidth
              InputLabelProps={{
                shrink: true
              }}
            />
            <Stripe
              name="Confirm purchase"
              description="Test only"
              amount={this.totalCost(currentCart)}
            />
          </form>
        </Grid>

        <Grid item xs={12} sm={6}>
          <Typography variant="h6">
            Total:{this.totalCost(currentCart)}
          </Typography>
        </Grid>
      </Grid>
    )
  }
}

//mapStateToProps
const mapStateToProps = state => {
  return {
    activeCart: state.cart
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getCart: () => {
      dispatch(getCart())
    }
  }
}

export default withStyles(styles)(
  connect(mapStateToProps, mapDispatchToProps)(Checkout)
)
