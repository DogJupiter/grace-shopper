import React from 'react'
import {withStyles} from '@material-ui/core/styles'

const styles = theme => ({
  sidebar: {
    width: '25%',
    height: '25vh',
    position: 'fixed',
    top: 0,
    bottom: 0
  }
})

class SideBar extends React.Component {
  render() {
    return (
      <div>
        <span>Hello from the SideBar</span>
      </div>
    )
  }
}

export default withStyles(styles)(SideBar)
