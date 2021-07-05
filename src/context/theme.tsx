import React from 'react'
import { DefaultTheme, ThemeProvider } from 'styled-components'

const theme: DefaultTheme = {
  shadows: {
    medium: '21px 34px 18px -19px  #00000041',
  },
  colors: {
    font: {
      main: '#ffffff',
    },
    background: 'linear-gradient(#47215f, #141a3a)',
    palette: {
      pink: {
        main: '#df02ba',
        light: '#f15ad8',
        dark: '#a00086',
      },
      violet: {
        main: '#644190',
        light: '#6c5589',
        dark: '#4a227b',
      },
      green: {
        main: '#2FE28C',
        light: '#91f8c6',
        dark: '#03763f',
      },
    },
  },
}

export default function StyledComponentsThemeProvider({ children }) {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>
}
