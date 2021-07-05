import 'styled-components'

type Color = {
  main: string
  light: string
  dark: string
}

declare module 'styled-components' {
  export interface DefaultTheme {
    shadows: {
      medium: string
    }
    colors: {
      font: {
        main: string
      }
      background: string
      palette: {
        violet: Color
        pink: Color
        green: Color
      }
    }
  }
}
