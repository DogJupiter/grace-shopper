import React, {Component} from 'react'

import {Navbar} from './components'
import Routes from './routes'
//sabira: import from the store
import {me, fetchCart} from './store'
import {MuiThemeProvider, createMuiTheme} from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
//sabira: don't quite understand why we importing connect from http2
// import { connect } from 'http2';
//sabira: import from react-redux
import {connect} from 'react-redux'

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
    await this.props.fetchUser()
    console.log('fetchServerCart')
    await this.props.fetchCart(this.props.user.id)
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

const mapState = state => ({
  user: state.user
})
//sabira: fetching user before anything else
const mapDispatch = dispatch => ({
  fetchUser: () => dispatch(me()),
  fetchCart: userId => dispatch(fetchCart(userId))
})

export default connect(mapState, mapDispatch)(App)
