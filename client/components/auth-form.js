import React, {Component} from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {auth, fetchCart, getCart} from '../store'
import {Grid, TextField, Button} from '@material-ui/core'

class AuthForm extends Component {
  constructor() {
    super()
    this.state = {
      firstName: '',
      lastName: '',
      password: '',
      email: ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  hanldeChange(evt) {
    this.setState({
      [evt.target.name]: evt.target.value
    })
  }

  async handleSubmit(evt) {
    evt.preventDefault()
    const formName = evt.target.name
    const email = evt.target.email.value
    const password = evt.target.password.value
    const firstName = evt.target.firstName.value
    const lastName = evt.target.lastName.value
    await this.props.auth(email, password, formName)
    await this.props.fetchCart(this.props.user.id)
  }
  render() {
    const {formName, displayName, error} = this.props
    const {firstName, lastName, password, email} = this.state
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
            <form method="get" action="/auth/google">
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
            </form>
            <form onSubmit={this.handleSubmit} name={name}>
              {formName !== 'login' && (
                <div>
                  <TextField
                    name="firstName"
                    label="First Name"
                    margin="normal"
                    id="standard-full-width"
                    style={{margin: 8}}
                    onChange={this.handleChange}
                    value={firstName}
                    fullWidth
                  />
                  <TextField
                    name="lastName"
                    label="Last Name"
                    margin="normal"
                    id="standard-full-width"
                    style={{margin: 8}}
                    onChange={this.handleChange}
                    value={lastName}
                    fullWidth
                  />
                </div>
              )}
              <TextField
                name="email"
                label="Email"
                margin="normal"
                id="standard-full-width"
                style={{margin: 8}}
                onChange={this.handleChange}
                value={email}
                fullWidth
              />
              <TextField
                name="password"
                label="Password"
                margin="normal"
                id="standard-full-width"
                style={{margin: 8}}
                onChange={this.handleChange}
                value={password}
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
    formName: 'login',
    displayName: 'Login',
    error: state.user.error,
    user: state.user
  }
}

const mapSignupToProps = state => {
  return {
    formName: 'signup',
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
  }
}

export const Login = connect(mapLoginToProps, mapDispatchToProps)(AuthForm)
export const Signup = connect(mapSignupToProps, mapDispatchToProps)(AuthForm)

//Google-Login

AuthForm.propTypes = {
  name: PropTypes.string.isRequired,
  displayName: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  error: PropTypes.object
}
