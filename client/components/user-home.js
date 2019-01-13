import React from 'react'
import PropTypes from 'prop-types'
import {Redirect} from 'react-router-dom'
import {connect} from 'react-redux'
/**
 * COMPONENT
 */
export const UserHome = props => {
  const {user} = props
  console.log(props.user, 'user from userHome')
  if (!user.id) {
    return <Redirect to="/" />
  }
  return (
    <div className="landing-page">
      <h3>Welcome {user.email}</h3>
    </div>
  )
}
/**
 * CONTAINER
 */
const mapState = state => {
  return {
    user: state.user
  }
}
export default connect(mapState)(UserHome)
/**
 * PROP TYPES
 */
UserHome.propTypes = {
  user: PropTypes.string
}
