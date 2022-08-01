import * as mui from '@mui/material'
import React from 'react'

import {Main} from '@src/components/Main'

const theme = mui.createTheme({
  typography: {
    button: {
      textTransform: 'none',
    },
  },
})

export const App: React.FC = () => {
  return (
    <mui.ThemeProvider theme={theme}>
      <Main />
    </mui.ThemeProvider>
  )
}
