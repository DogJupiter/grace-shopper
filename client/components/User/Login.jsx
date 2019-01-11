import React from 'react'
import {connect} from 'react-redux'
import PropTypes from 'props-types'
import {auth} from '../store'

const LoginForm = props => {
  const {name, displayName, handleSubmit, error} = props
  return (
    <div
      className="page-header header-filter"
      style={{
        backgroundImage: "url('../resources/assets/img/bg7.jpg')",
        backgroundSize: 'cover',
        backgroundPosition: 'top center'
      }}
    >
      <div className="container">
        <div className="row">
          <div className="col-md-4 col-md-offset-4 col-sm-6 col-sm-offset-3">
            <div className="card card-signup">
              <form className="form" onSubmit={handleSubmit} name={name}>
                <div
                  className="header header-primary text-center"
                  style={{display: 'block'}}
                >
                  <h4 className="card-title">{displayName}</h4>
                  <div className="social-line">
                    <a
                      href="auth/facebook"
                      className="btn btn-just-icon btn-simple"
                    >
                      <i className="fa fa-facebook-square" />
                    </a>
                    <a
                      href="/auth/twitter"
                      className="btn btn-just-icon btn-simple"
                    >
                      <i className="fa fa-twitter" />
                    </a>
                    <a
                      href="/auth/google"
                      className="btn btn-just-icon btn-simple"
                    >
                      <i className="fa fa-google-plus" />
                    </a>
                  </div>
                </div>
                <p className="description text-center">Or</p>
                <div className="card-content">
                  {name !== 'login' && (
                    <div className="input-group">
                      <span className="input-group-addon">
                        <i className="material-icons">face</i>
                      </span>
                      <input
                        type="text"
                        className="form-control"
                        name="firstName"
                        placeholder="First Name..."
                      />
                    </div>
                  )}

                  <div className="input-group">
                    <span className="input-group-addon">
                      <i className="material-icons">email</i>
                    </span>
                    <input
                      type="text"
                      className="form-control"
                      name="email"
                      placeholder="Email..."
                    />
                  </div>

                  <div className="input-group">
                    <span className="input-group-addon">
                      <i className="material-icons">lock_outline</i>
                    </span>
                    <input
                      type="password"
                      placeholder="Password..."
                      name="password"
                      className="form-control"
                    />
                  </div>
                </div>
                <div className="footer text-center" style={{display: 'block'}}>
                  <button type="submit">Get Started</button>
                </div>
                {error && error.response && <div> {error.response.data} </div>}
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

const mapLoginToProps = state => {
  return {
    name: 'login',
    display: 'Login',
    error: state.user.error
  }
}

const mapSignupToProps = state => {
  return {
    name: 'signup',
    display: 'Sign Up',
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
      dispatch(auth(formName, email, password))
    }
  }
}

export const Login = connect(mapLoginToProps, mapDispatchToProps)(LoginForm)
export const Signup = connect(mapSignupToProps, mapDispatchToProps)(LoginForm)

Login.propTypes = {
  name: PropTypes.string.isRequired,
  display: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  error: PropTypes.object
}
