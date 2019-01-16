import React from 'react'
// Material UI
import {withStyles} from '@material-ui/core/styles'
import Drawer from '@material-ui/core/Drawer'
import List from '@material-ui/core/List'
import Typography from '@material-ui/core/Typography'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import {Link} from 'react-router-dom'

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
            <Link to={{pathname: '/filter', search: `?category=food`}}>
              <ListItem button>
                <ListItemText>Food</ListItemText>
              </ListItem>
            </Link>
            <Link to={{pathname: '/filter', search: `?category=drink`}}>
              <ListItem button>
                <ListItemText>Drink</ListItemText>
              </ListItem>
            </Link>
            <Link to={{pathname: '/filter', search: `?category=entertainment`}}>
              <ListItem button>
                <ListItemText>Entertainment</ListItemText>
              </ListItem>
            </Link>
            <Link to={{pathname: '/filter', search: `?category=education`}}>
              <ListItem button>
                <ListItemText>Education</ListItemText>
              </ListItem>
            </Link>
          </List>
        </Drawer>
      </div>
    )
  }
}

export default withStyles(styles)(SideBar)
