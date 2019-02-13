import React from 'react'
import {withStyles} from '@material-ui/core/styles'
import Drawer from '@material-ui/core/Drawer'
import List from '@material-ui/core/List'
import Typography from '@material-ui/core/Typography'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import Icon from '@material-ui/core/Icon'
import {Link} from 'react-router-dom'
import Fastfood from '@material-ui/icons/Fastfood'
import Casino from '@material-ui/icons/Casino'
import School from '@material-ui/icons/School'
import LocalBar from '@material-ui/icons/LocalBar'
const drawerWidth = 264

const styles = theme => ({
  root: {
    display: 'flex'
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0
  },
  // drawerPaper: {
  //   width: drawerWidth,
  //   position: 'absolute',
  //   top: 80,
  //    height: 'auto',
  // },
  drawerPaper: {
    width: '100%',
    top: 66, //Navbar height
    height: 'auto',
    position: 'absolute',
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      height: '100%'
    }
  },
  drawerHeader: {
    // 600px or smaller
    [theme.breakpoints.down('xs')]: {
      display: 'none'
    },
    padding: theme.spacing.unit * 2,

    textTransform: 'uppercase',
    fontWeight: 700,
    letterSpacing: '0.6px',
    fontSize: '1.25rem',
    lineHeight: '1.875rem'
  },
  navItem: {
    '&:hover': {
      color: '#627264'
    }
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
            <Link to="/experiences">
              <Typography className={classes.drawerHeader} variant="h5">
                Categories
              </Typography>
            </Link>
            <Link to={{pathname: '/filter', search: `?category=food`}}>
              <ListItem button className={classes.navItem}>
                <ListItemIcon>
                  <Fastfood />
                </ListItemIcon>
                <ListItemText>Food</ListItemText>
              </ListItem>
            </Link>
            <Link to={{pathname: '/filter', search: `?category=drink`}}>
              <ListItem button className={classes.navItem}>
                <ListItemIcon>
                  <LocalBar />
                </ListItemIcon>
                <ListItemText>Drink</ListItemText>
              </ListItem>
            </Link>
            <Link to={{pathname: '/filter', search: `?category=entertainment`}}>
              <ListItem button className={classes.navItem}>
                <ListItemIcon>
                  <Casino />
                </ListItemIcon>
                <ListItemText>Entertainment</ListItemText>
              </ListItem>
            </Link>
            <Link to={{pathname: '/filter', search: `?category=education`}}>
              <ListItem button className={classes.navItem}>
                <ListItemIcon>
                  <School />
                </ListItemIcon>
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
