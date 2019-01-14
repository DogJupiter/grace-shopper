//react, redux
import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout, fetchCart} from '../store'
//materialUI
import {fade} from '@material-ui/core/styles/colorManipulator'
import {withStyles} from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import SearchIcon from '@material-ui/icons/Search'
import {
  AppBar,
  Toolbar,
  Button,
  InputBase,
  IconButton,
  Badge
} from '@material-ui/core'
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart'
import {getCart} from '../store/cart'

const styles = theme => ({
  root: {
    flexGrow: 1
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1
  },
  grow: {
    flexGrow: 1
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25)
    },
    marginRight: theme.spacing.unit * 2,
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing.unit * 3,
      width: 'auto'
    }
  },
  searchIcon: {
    width: theme.spacing.unit * 9,
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  inputRoot: {
    color: 'inherit',
    width: '100%'
  },
  inputInput: {
    paddingTop: theme.spacing.unit,
    paddingRight: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
    paddingLeft: theme.spacing.unit * 10,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: 200
    }
  }
})

class Navbar extends Component {
  constructor() {
    super()
    this.handleLogout = this.handleLogout.bind(this)
  }

  async componentDidMount() {
    // this.props.getCart()
    this.props.user.id
      ? await this.props.fetchCart(this.props.user.id)
      : this.props.getCart()
  }
  //sabira: refactored function
  sumCart(cart) {
    return cart.experiences.reduce((accum, item) => accum + item.quantity, 0)
  }

  async handleLogout() {
    await this.props.logout()
  }

  render() {
    const {isLoggedIn, classes, activeCart} = this.props
    return (
      <div className={classes.root}>
        <AppBar position="static" color="secondary" className={classes.appBar}>
          <Toolbar>
            <div>
              <Link to="/experiences">
                <img src="/logo.svg" style={{height: 50}} />
              </Link>
            </div>
            <div className={classes.grow} />
            <div className={classes.search}>
              <div className={classes.searchIcon}>
                <SearchIcon />
              </div>
              <InputBase
                placeholder="Search…"
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput
                }}
              />
            </div>
            <div className={classes.sectionDesktop}>
              {isLoggedIn ? (
                <a onClick={this.handleLogout}>
                  <Button color="primary">Logout</Button>
                </a>
              ) : (
                <div>
                  <Link to="/login">
                    <Button color="primary">Login</Button>
                  </Link>
                  <Link to="/signup">
                    <Button color="primary">SignUp</Button>
                  </Link>
                </div>
              )}
            </div>
            {isLoggedIn ? (
              this.props.cartServer.items ? (
                <Link to="/cart">
                  <IconButton color="primary">
                    <Badge
                      className={classes.margin}
                      badgeContent={this.props.cartServer.items.length}
                      color="primary"
                    >
                      <ShoppingCartIcon color="inherit" />
                    </Badge>
                  </IconButton>
                </Link>
              ) : (
                <Link to="/cart">
                  <IconButton color="primary">
                    <Badge
                      className={classes.margin}
                      badgeContent={0}
                      color="primary"
                    >
                      <ShoppingCartIcon color="inherit" />
                    </Badge>
                  </IconButton>
                </Link>
              )
            ) : activeCart.experiences.length ? (
              <Link to="/cart">
                <IconButton color="primary">
                  <Badge
                    className={classes.margin}
                    badgeContent={this.sumCart(activeCart)}
                    color="primary"
                  >
                    <ShoppingCartIcon color="inherit" />
                  </Badge>
                </IconButton>
              </Link>
            ) : (
              <Link to="/cart">
                <IconButton color="primary">
                  <Badge
                    className={classes.margin}
                    badgeContent={0}
                    color="primary"
                  >
                    <ShoppingCartIcon color="inherit" />
                  </Badge>
                </IconButton>
              </Link>
            )}
          </Toolbar>
        </AppBar>
      </div>
    )
  }
}
/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.user.id,
    activeCart: state.cart,
    cartServer: state.cartServer,
    user: state.user
  }
}
const mapDispatch = dispatch => {
  return {
    // sabira: handleClick is now handle logout, if you scroll up you'll see
    // handleClick() {
    //   dispatch(logout())
    // },
    logout: () => dispatch(logout()),
    getCart: () => dispatch(getCart()),
    fetchCart: userId => dispatch(fetchCart(userId))
  }
}
export default withStyles(styles)(connect(mapState, mapDispatch)(Navbar))
/**
 * PROP TYPES
 */
Navbar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
  classes: PropTypes.object.isRequired
}
{
  /* <AppBar>
        <h1>DOG JUPITER</h1>
        <Typography variant='display1' align='center' gutterBottom>
          Exercises
      </Typography>
      </AppBar> */
}
