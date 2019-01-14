import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {Redirect, Link} from 'react-router-dom'
import {connect} from 'react-redux'

import {Button} from '@material-ui/core'
import {withStyles} from '@material-ui/core/styles'

const styles = theme => ({
  button: {
    margin: theme.spacing.unit
  },
  input: {
    display: 'none'
  }
})

class UserHome extends Component {
  //export const UserHome = props => {
  render() {
    const {user} = this.props
    const {classes} = this.props
    if (!user.id) {
      return (
        <div className="landing-page-container">
          <Redirect to="/experiences" />
          <div className="overlay" />
          <video autoPlay loop className="video-background" muted plays-inline>
            <source
              src="https://storage.googleapis.com/coverr-main/mp4/Mt_Baker.mp4"
              type="video/mp4"
            />
          </video>

          <div className="row">
            <h1>EXPERIENCE NEW YORK CITY</h1>
            <h1>WITH THE LOCALS</h1>
            <label htmlFor="outlined-button-file">
              <Button
                variant="outlined"
                component="span"
                className={classes.button}
                color="primary"
                Large
                component={Link}
                to="/experiences"
              >
                START EXPOLORING
              </Button>
            </label>
          </div>
        </div>
      )
    }
    return (
      <div>
        <div classNmae="landing-page">
          <h3>Welcome Back, {user.email}!</h3>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    user: state.user,
    //sabira - checks if the user loggedIn
    isLoggedIn: !!state.user.id
  }
}

export default withStyles(styles)(connect(mapStateToProps)(UserHome))

UserHome.propTypes = {
  user: PropTypes.string
}

