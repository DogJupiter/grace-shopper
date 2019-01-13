import React from 'react'
import PropTypes from 'prop-types'
import {Redirect} from 'react-router-dom'
import {connect} from 'react-redux'
/**
 * COMPONENT
 */
export const UserHome = props => {
  const {user, isLoggedIn} = props
  console.log(props.user, 'user from userHome')

  return isLoggedIn ? (
    <div className="landing-page">
      <h3>Welcome {user.email}</h3>
    </div>
  ) : (
    //sabira: if user is not logged in he has to see all experiences
    //sabira: path changed to '/experiences' instead of '/' which directs to userhome again
    <Redirect to="/experiences" />
  )
}
/**
 * CONTAINER
 */
const mapState = state => {
  return {
    user: state.user,
    //sabira - checks if the user loggedIn
    isLoggedIn: !!state.user.id
  }
}
export default connect(mapState)(UserHome)
/**
 * PROP TYPES
 */
// UserHome.propTypes = {
//   user: PropTypes.string
// }
