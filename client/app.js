import React, {Component} from 'react'
//sabira: propTypes added
import PropTypes from 'prop-types'
import {Navbar} from './components'
import Routes from './routes'
//sabira: import from the store
import {me, fetchCart, getCart} from './store'
import {MuiThemeProvider, createMuiTheme} from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
//sabira: don't quite understand why we importing connect from http2
// import { connect } from 'http2';
//sabira: import from react-redux
import {connect} from 'react-redux'
//sabira: trying to wrap component with router as it as before in routes.js
import {withRouter} from 'react-router-dom'

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#FFFFFF'
    },
    secondary: {
      main: '#627264',
      contrastText: '#FAE8EB'
    },
    badges: {
      main: '#FAE8EB'
    },
    font: {
      main: '#484848'
    },
    titleFont: {
      main: '#FCC30A'
    }
  }
})
//sabira: I am applying class instead of functional component
class App extends Component {
  //sabira: fetching me - to stay logged in
  //fetch cart before anything else
  async componentDidMount() {
    const {user, isLoggedIn, loadInitialData} = this.props
    loadInitialData()
    isLoggedIn ? await this.props.fetchCart(user.id) : this.props.getCart()
  }

  render() {
    return (
      <div>
        <CssBaseline />
        <MuiThemeProvider theme={theme}>
          <Navbar />
          <Routes />
        </MuiThemeProvider>
      </div>
    )
  }
}

const mapState = state => {
  return {
    // Being 'logged in' for our purposes will be defined has having a state.user that has a truthy id.
    // Otherwise, state.user will be an empty object, and state.user.id will be falsey
    isLoggedIn: !!state.user.id
  }
}
const mapDispatch = dispatch => {
  return {
    loadInitialData() {
      dispatch(me())
    },
    fetchCart: userId => dispatch(fetchCart(userId)),
    getCart: () => dispatch(getCart())
  }
}

export default withRouter(connect(mapState, mapDispatch)(App))

App.propTypes = {
  loadInitialData: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
