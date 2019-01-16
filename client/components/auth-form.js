import React, {Component} from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'

import {auth, fetchCart} from '../store'
import {Grid, TextField, Button, InputAdornment} from '@material-ui/core'

import {AccountCircle} from '@material-ui/icons'

import {
  withStyles,
  MuiThemeProvider,
  createMuiTheme
} from '@material-ui/core/styles'

const styles = theme => ({
  root: {
    flexGrow: 1
  },
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginTop: 30
  }
})
const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#627264'
    }
  }
})

class AuthForm extends Component {
  constructor() {
    super()
    this.state = {
      email: '',
      password: ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  async handleSubmit(evt) {
    evt.preventDefault()

    const method = evt.target.name
    const email = evt.target.email.value
    const password = evt.target.password.value

    if (this.props.name !== 'signup') {
      await this.props.auth({email, password, method})
    } else {
      const firstName = evt.target.firstName.value
      const lastName = evt.target.lastName.value
      await this.props.auth({
        method,
        firstName,
        lastName,
        email,
        password
      })
    }
  }
  render() {
    const {name, displayName, error, classes} = this.props
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
            {name !== 'signup' ? (
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
            ) : (
              <form onSubmit={this.handleSubmit} name={name}>
                <TextField
                  name="firstName"
                  label="First Name"
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
                  name="lastName"
                  label="Last Name"
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
            )}

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
            {error &&
              error.response && (
                <div className={classes.container}>
                  <Grid className={classes.container}>
                    <Grid item xs={12} className={classes.container}>
                      <Typography variant="h6" styles={{textAlign: 'center'}}>
                        {error.response.data}
                      </Typography>
                    </Grid>
                  </Grid>
                </div>
              )}
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
    auth: formObj => dispatch(auth(formObj)),
    fetchCart: userId => dispatch(fetchCart(userId))
  }
}

export const Login = withStyles(styles)(
  connect(mapLoginToProps, mapDispatchToProps)(AuthForm)
)
export const Signup = withStyles(styles)(
  connect(mapSignupToProps, mapDispatchToProps)(AuthForm)
)

AuthForm.propTypes = {
  name: PropTypes.string.isRequired,
  displayName: PropTypes.string.isRequired,
  error: PropTypes.object
}
