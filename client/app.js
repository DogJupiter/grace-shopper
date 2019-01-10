import React from 'react'

import {Navbar} from './components'
import Routes from './routes'
import {MuiThemeProvider, createMuiTheme} from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#FFFFFF'
    },
    secondary: {
      main: '#627264'
    },
    font: {
      main: '#484848'
    },
    titleFont: {
      main: '#FCC30A'
    }
  }
})

const App = () => {
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

export default App
