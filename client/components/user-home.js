import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {Redirect} from 'react-router-dom'
import {connect} from 'react-redux'
/**
 * COMPONENT
 */
class UserHome extends Component {
  constructor(props) {
    super(props)
    this.state = {
      videoUrl: '/media/SampleVideo1',
      user: ''
    }
  }

  //export const UserHome = props => {
  render() {
    const {user} = this.props
    console.log('whats this.props', this.props)
    if (!user.id) {
      return (
        <div>
          <Redirect to="/" />
          <video autoPlay loop id="video-background" muted plays-inline>
            <source
              src="http://techslides.com/demos/sample-videos/small.mp4"
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
/**
 * CONTAINER
 */
const mapStateToProps = state => {
  return {
    user: state.user
  }
}
export default connect(mapStateToProps)(UserHome)
/**
 * PROP TYPES
 */
UserHome.propTypes = {
  user: PropTypes.string
}
