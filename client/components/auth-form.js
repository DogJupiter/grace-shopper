import React, {Component} from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {auth, fetchCart, getCart} from '../store'
import {Grid, TextField, Button, InputAdornment} from '@material-ui/core'
import {AccountCircle} from '@material-ui/icons'

class AuthForm extends Component {
  constructor() {
    super()
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  async handleSubmit(evt) {
    evt.preventDefault()
    const formName = evt.target.name
    const email = evt.target.email.value
    const password = evt.target.password.value
    await this.props.auth(email, password, formName)
    await this.props.fetchCart(this.props.user.id)
  }
  render() {
    const {name, displayName, error} = this.props
    return (
      <div>
        <Grid
          container
          spacing={0}
          direction="column"
          alignItems="center"
          justify="center"
          style={{minHeight: '100vh'}}
        >
          <Grid item xs={12}>
            {/* <form method="get" action="/auth/google">
              <Button
                type="submit"
                color="primary"
                variant="contained"
                id="standard-full-width"
                style={{margin: 8}}
                fullWidth
              >
                {displayName} with Google
              </Button>
            </form> */}
            {/*
            <TextField
              className={classes.margin}
              id="input-with-icon-textfield"
              label="TextField"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <AccountCircle />
                  </InputAdornment>
                )
              }} */}
            {/* /> */}
            <form onSubmit={this.handleSubmit} name={name}>
              <TextField
                name="email"
                label="Email"
                margin="normal"
                id="standard-full-width"
                style={{margin: 8}}
                fullWidth
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <AccountCircle />
                    </InputAdornment>
                  )
                }}
              />
              <TextField
                name="password"
                label="Password"
                margin="normal"
                id="standard-full-width"
                style={{margin: 8}}
                fullWidth
              />
              <Button
                type="submit"
                color="primary"
                variant="contained"
                id="standard-full-width"
                style={{margin: 8}}
                fullWidth
              >
                {displayName}
              </Button>
              {error && error.response && <div> {error.response.data} </div>}
            </form>
          </Grid>
        </Grid>
      </div>
    )
  }
}

const mapLoginToProps = state => {
  return {
    name: 'login',
    displayName: 'Login',
    error: state.user.error,
    user: state.user
  }
}

const mapSignupToProps = state => {
  return {
    name: 'signup',
    displayName: 'Sign Up',
    error: state.user.error,
    user: state.user
  }
}

const mapDispatchToProps = dispatch => {
  return {
    auth: (email, password, formName) =>
      dispatch(auth(email, password, formName)),
    fetchCart: userId => dispatch(fetchCart(userId))
    //sabira: this is a code I mentioned earlier. Couldn't figure out how to place fetchCart function
    //  handleSubmit(evt) {
    //     evt.preventDefault()
    //     const formName = evt.target.name
    //     const email = evt.target.email.value
    //     const password = evt.target.password.value

    //     await dispatch(auth(email, password, formName))

    //   }
  }
}

export const Login = connect(mapLoginToProps, mapDispatchToProps)(AuthForm)
export const Signup = connect(mapSignupToProps, mapDispatchToProps)(AuthForm)

//Google-Login

AuthForm.propTypes = {
  name: PropTypes.string.isRequired,
  displayName: PropTypes.string.isRequired,
  error: PropTypes.object
}
