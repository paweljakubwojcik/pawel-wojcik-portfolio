import { createGlobalStyle } from 'styled-components'

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: ${(props) => props.theme.colors.font.main};
    background: ${(props) => props.theme.colors.background};
    background-attachment:fixed;
    min-height: 100vh;
    overflow-x: hidden;
    font-family: 'Montserrat', sans-serif;
    font-weight: normal;
    word-wrap: break-word;
    font-kerning: normal;
    -moz-font-feature-settings: "kern", "liga", "clig", "calt";
    -ms-font-feature-settings: "kern", "liga", "clig", "calt";
    -webkit-font-feature-settings: "kern", "liga", "clig", "calt";
    font-feature-settings: "kern", "liga", "clig", "calt";

   

    /* variables that changes globally with screen size */
    --content-global-padding: 2em;
    
    @media (max-width: ${(props) => props.theme.breakpoints.MAX_MOBILE}px){
       --content-global-padding: 1em;
       font-size: 16px;
    }

    transition: font-size .2s;

  }


  html {
    -ms-text-size-adjust: 100%;
    -webkit-text-size-adjust: 100%;
    font: 112.5%/1.45em georgia, serif, sans-serif;
    box-sizing: border-box;
    overflow-x: hidden;


    scrollbar-width: thin;
    scrollbar-color: ${(props) =>
      `${props.theme.colors.palette.violet.light} ${props.theme.colors.palette.violet.dark}`}; /* scroll thumb & track */
    &::-webkit-scrollbar {
      width: 8px;
    }
    &::-webkit-scrollbar-track {
      background: ${(props) => props.theme.colors.palette.violet.dark};
    }
    &::-webkit-scrollbar-thumb {
      background-color: ${(props) => props.theme.colors.palette.violet.light};
      border-radius: 20px;
      width: 12px;
      opacity: 0.5;
    }

  }

  a{
    color: ${(props) => props.theme.colors.palette.pink.light};
    text-decoration: none;
  }

  * :focus:not(input):not(textarea):not(:active) {
            outline: 1px solid ${(props) => props.theme.colors.palette.pink.light};
    }

`

export default GlobalStyle
