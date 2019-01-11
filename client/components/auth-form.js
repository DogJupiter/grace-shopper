import React from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {auth} from '../store'
import {Grid, TextField, Button} from '@material-ui/core'

const AuthForm = props => {
  const {name, displayName, handleSubmit, error} = props

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
          <form onSubmit={handleSubmit} name={name}>
            <TextField
              name="email"
              label="Email"
              margin="normal"
              id="standard-full-width"
              style={{margin: 8}}
              fullWidth
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

const mapLoginToProps = state => {
  return {
    name: 'login',
    displayName: 'Login',
    error: state.user.error
  }
}

const mapSignupToProps = state => {
  return {
    name: 'signup',
    displayName: 'Sign Up',
    error: state.user.error
  }
}

const mapDispatchToProps = dispatch => {
  return {
    handleSubmit(evt) {
      evt.preventDefault()
      const formName = evt.target.name
      const email = evt.target.email.value
      const password = evt.target.password.value
      dispatch(auth(email, password, formName))
    }
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
