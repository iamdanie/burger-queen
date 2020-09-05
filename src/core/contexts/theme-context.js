import React from 'react'
import {MuiThemeProvider, createMuiTheme} from '@material-ui/core/styles'

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#e57373'
    },
    secondary: {
      main: '#af4448'
    },
    disabled: {
      main: '#fafafa'
    },
    warning: {
      main: '#FF7F50'
    },
    success: {
      main: '#3CB371'
    }
  }
})

export function ThemeProvider({children}) {
  return <MuiThemeProvider theme={theme}>{children}</MuiThemeProvider>
}
