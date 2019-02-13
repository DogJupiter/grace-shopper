import React, {Component} from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {Link} from 'react-router-dom'
import {auth, fetchCart} from '../store'
import Paper from '@material-ui/core/Paper'
import Button from '@material-ui/core/Button'
import Textfield from '@material-ui/core/TextField'
import FormHelperText from '@material-ui/core/FormHelperText'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import red from '@material-ui/core/colors/red'
import Visibility from '@material-ui/icons/Visibility'
import VisibilityOff from '@material-ui/icons/VisibilityOff'
import InputAdornment from '@material-ui/core/InputAdornment'
import IconButton from '@material-ui/core/IconButton'
import {withStyles} from '@material-ui/core/styles'
const styles = theme => ({
  root: {
    padding: theme.spacing.unit * 4,
    marginTop: theme.spacing.unit * 16,
    marginLeft: 'auto',
    marginRight: 'auto',
    width: '95%',
    // md = 960px or larger
    [theme.breakpoints.up('md')]: {
      width: '70%',
      padding: theme.spacing.unit * 8
    }
  },
  form: {
    marginTop: theme.spacing.unit * 4
  },
  errorMessage: {
    marginTop: 0,
    color: red.A200,
    fontSize: '16px'
  }
})

class AuthForm extends Component {
  constructor() {
    super()
    this.state = {
      showPassword: false
    }

    this.handleClickShowPassword = this.handleClickShowPassword.bind(this)
  }

  handleClickShowPassword = () => {
    this.setState(state => ({showPassword: !this.state.showPassword}))
  }

  render() {
    const {name, displayName, error, classes, handleSubmit} = this.props

    return (
      // <Paper className={classes.root} elevation={2}>
      <div className={classes.root}>
        <Grid
          container
          spacing={8}
          justify="space-between"
          alignItems="baseline"
        >
          <Grid item>
            <Typography variant="h3" component="h3" gutterBottom>
              {/* Log In To Be New York or Sign Up For Be New York */}
              {displayName}
            </Typography>
          </Grid>
          <Grid item>
            {name === 'login' ? (
              <Button component={Link} to="/signup">
                Sign Up Instead
              </Button>
            ) : (
              <Button component={Link} to="/login">
                Log In Instead
              </Button>
            )}
          </Grid>
        </Grid>
        <form
          onSubmit={evt => handleSubmit(evt, this.props.history)}
          name={name}
          className={classes.form}
        >
          <Grid container spacing={24}>
            {name === 'signup' ? (
              <Grid item xs={12}>
                {' '}
                <Textfield
                  name="fullName"
                  label="Your Name"
                  variant="outlined"
                  type="text"
                  fullWidth
                  autoFocus={name === 'signup'}
                  required
                  InputLabelProps={{
                    shrink: true
                  }}
                />
              </Grid>
            ) : (
              ''
            )}
            <Grid item xs={6}>
              <Textfield
                name="email"
                label="Your Email Address"
                variant="outlined"
                type="email"
                fullWidth
                autoFocus={name === 'login'}
                InputLabelProps={{
                  shrink: true
                }}
                required
              />
            </Grid>
            <Grid item xs={6}>
              <Textfield
                id="outlined-adornment-password"
                name="password"
                label="Your Password"
                variant="outlined"
                type={this.state.showPassword ? 'text' : 'password'}
                fullWidth
                required
                autoComplete="current-password"
                InputLabelProps={{
                  shrink: true
                }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="Toggle password visibility"
                        onClick={this.handleClickShowPassword}
                      >
                        {this.state.showPassword ? (
                          <VisibilityOff />
                        ) : (
                          <Visibility />
                        )}
                      </IconButton>
                    </InputAdornment>
                  )
                }}
              />
            </Grid>
            <Grid item>
              <Button
                type="submit"
                color="secondary"
                variant="outlined"
                size="large"
                className={classes.button}
              >
                {displayName}
              </Button>
            </Grid>
            <Grid item>
              <Button
                type="submit"
                color="secondary"
                variant="outlined"
                size="large"
                href="/auth/google"
                className={classes.button}
              >
                {displayName} with Google
              </Button>
            </Grid>
            <Grid item>
              <Typography variant="subtitle2" component="p" color="inherit">
                <FormHelperText
                  component="span"
                  className={classes.errorMessage}
                >
                  {error && error.response && error.response.data}
                </FormHelperText>
              </Typography>
            </Grid>
          </Grid>
        </form>
        {/* </Paper> */}
      </div>
    )
  }
}

const StyledAuthForm = withStyles(styles)(AuthForm)

const mapLogin = state => {
  return {
    name: 'login',
    displayName: 'Log In',
    error: state.user.error
  }
}

const mapSignup = state => {
  return {
    name: 'signup',
    displayName: 'Sign Up',
    error: state.user.error
  }
}

const mapDispatch = dispatch => {
  return {
    // fetchCart: userId => dispatch(fetchCart(userId)),
    handleSubmit(evt, history) {
      evt.preventDefault()
      const formName = evt.target.name

      const email = evt.target.email.value
      const password = evt.target.password.value
      let fullName
      if (evt.target.fullName) {
        fullName = evt.target.fullName.value
      }

      dispatch(auth(email, password, fullName, formName, history))
      // props.history.push('/experiences')
    }
  }
}

export const Login = connect(mapLogin, mapDispatch)(StyledAuthForm)
export const Signup = connect(mapSignup, mapDispatch)(StyledAuthForm)

AuthForm.propTypes = {
  name: PropTypes.string.isRequired,
  displayName: PropTypes.string.isRequired,
  error: PropTypes.object
}
