import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {Redirect} from 'react-router-dom'
import {connect} from 'react-redux'

/**
 * COMPONENT
 */
class UserHome extends Component {
  //export const UserHome = props => {
  render() {
    const {user} = this.props
    if (!user.id) {
      return (
        <div className="landing-page-container">
          <Redirect to="/" />
          <div className="overlay" />
          <video autoPlay loop className="video-background" muted plays-inline>
            <source
              src="https://storage.googleapis.com/coverr-main/mp4/Mt_Baker.mp4"
              type="video/mp4"
            />
          </video>
        </div>
      )
    }
    return (
      <div>
        <div classNmae="landing-page">
          <h3>Welcome {user.email}</h3>
        </div>
        <video autoPlay loop id="video-background" muted plays-inline>
          <source
            src="http://techslides.com/demos/sample-videos/small.mp4"
            type="video/mp4"
          />
        </video>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    user: state.user
  }
}
export default connect(mapStateToProps)(UserHome)

UserHome.propTypes = {
  user: PropTypes.string
}
