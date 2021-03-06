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
  render() {
    const {user, classes} = this.props
    if (!user.id) {
      return (
        <div className="landing-page-container">
          <Redirect to="/" />
          <div className="overlay" />
          <video autoPlay loop className="video-background" muted plays-inline>
            <source
              src="https://media.cntraveler.com/clips/5a983caea566be4ab1b46ccf/720p/pass/CNT_Marquee_NYC_022618.mp4"
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
        <div className="landing-page">
          <Redirect to="/experiences" />
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    user: state.user,
    isLoggedIn: !!state.user.id
  }
}

export default withStyles(styles)(connect(mapStateToProps)(UserHome))

UserHome.propTypes = {
  user: PropTypes.string
}
