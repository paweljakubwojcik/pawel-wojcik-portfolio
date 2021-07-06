import 'styled-components'

declare module 'styled-components' {
  type Color = {
    main: string
    light: string
    dark: string
  }
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
    breakpoints: {
      MAX_MOBILE: number
      MAX_TABLET: number
      MAX_LAPTOP: number
    }
  }
}
