import React, {Component} from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {auth, fetchCart, getCart} from '../store'
import {Grid, TextField, Button, Typography} from '@material-ui/core'
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
    console.log(this.state)
  }

  async handleSubmit(evt) {
    evt.preventDefault()
    const formName = evt.target.name
    const email = this.state.email
    const password = this.state.password
    await this.props.auth(email, password, formName)
  }
  render() {
    const {name, displayName, error, classes} = this.props
    return (
      <div className={classes.container}>
        <Grid className={classes.container}>
          <Grid item xs={12} className={classes.container}>
            <Typography variant="h4" styles={{textAlign: 'center'}}>
              LOGIN
            </Typography>
          </Grid>
          <MuiThemeProvider theme={theme}>
            <form
              className={classes.container}
              onSubmit={this.handleSubmit}
              name={name}
            >
              <Grid item xs={12}>
                <TextField
                  required
                  // id="outlined-full-width"
                  label="Email"
                  style={{margin: 8, width: '95%'}}
                  margin="normal"
                  variant="outlined"
                  type="email"
                  name="email"
                  InputLabelProps={{
                    shrink: true
                  }}
                  placeholder="Email"
                  onChange={this.handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  // id="outlined-full-width"
                  label="Password"
                  style={{margin: 8, width: '95%'}}
                  margin="normal"
                  variant="outlined"
                  type="password"
                  name="password"
                  InputLabelProps={{
                    shrink: true
                  }}
                  placeholder="Password"
                  onChange={this.handleChange}
                />
              </Grid>
              <Grid item xs={12} className={classes.container}>
                <Button
                  type="submit"
                  color="primary"
                  variant="outlined"
                  // id="standard-full-width"
                  style={{margin: 8}}
                  // fullWidth
                >
                  {displayName}
                </Button>
              </Grid>

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
            </form>
          </MuiThemeProvider>
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

export const Login = withStyles(styles)(
  connect(mapLoginToProps, mapDispatchToProps)(AuthForm)
)
export const Signup = withStyles(styles)(
  connect(mapSignupToProps, mapDispatchToProps)(AuthForm)
)

//Google-Login

AuthForm.propTypes = {
  name: PropTypes.string.isRequired,
  displayName: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  error: PropTypes.object
}
