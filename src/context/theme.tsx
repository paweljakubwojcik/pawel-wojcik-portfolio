import React from 'react'
import { useContext } from 'react'
import { ThemeContext, ThemeProvider, DefaultTheme } from 'styled-components'
import '../typescript'
const theme: DefaultTheme = {
  shadows: {
    medium: ' rgba(0, 0, 0, 0.24) 0px 3px 8px;',
    hard: 'rgba(0,0,0,0.5) 0px 9px 7px -2px',
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
  breakpoints: {
    MAX_MOBILE: 480,
    MIN_TABLET: 481,
    MAX_TABLET: 720,
    MIN_LAPTOP: 721,
    MAX_LAPTOP: 1440,
    MIN_WIDESCREEN: 1441,
  },
}

export default function StyledComponentsThemeProvider({ children }) {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>
}

export const useTheme = () => useContext<DefaultTheme>(ThemeContext)
