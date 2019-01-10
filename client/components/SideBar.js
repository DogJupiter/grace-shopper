import React from 'react'
// Material UI
import {withStyles} from '@material-ui/core/styles'
import Drawer from '@material-ui/core/Drawer'
import List from '@material-ui/core/List'
import Typography from '@material-ui/core/Typography'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'

const drawerWidth = 246

const styles = theme => ({
  root: {
    display: 'flex'
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0
  },
  drawerPaper: {
    width: drawerWidth,
    position: 'absolute',
    top: 65
  }
})

class SideBar extends React.Component {
  render() {
    const {classes} = this.props
    return (
      <div className={classes.root}>
        <Drawer
          className={classes.drawer}
          variant="permanent"
          classes={{
            paper: classes.drawerPaper
          }}
        >
          <List>
            <Typography style={{margin: 10}} variant="h6">
              Category
            </Typography>
            {[
              'Sports',
              'Entertainment',
              'Health & Wellness',
              'Food & Drinks'
            ].map((text, index) => (
              <ListItem button key={text}>
                <ListItemText primary={text} />
              </ListItem>
            ))}
          </List>
        </Drawer>
      </div>
    )
  }
}

export default withStyles(styles)(SideBar)
