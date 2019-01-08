import React from 'react'

import {Navbar} from './components'
import Routes from './routes'
import {MuiThemeProvider, createMuiTheme} from '@material-ui/core/styles'
const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#FFFFFF'
    },
    secondary: {
      main: '#627264'
    }
  }
})

const App = () => {
  return (
    <div>
      <MuiThemeProvider theme={theme}>
        <Navbar />
        <Routes />
      </MuiThemeProvider>
    </div>
  )
}

export default App
