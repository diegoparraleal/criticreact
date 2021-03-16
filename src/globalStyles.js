import { criticPalette, criticTheme } from 'app/theme/theme'
import { createGlobalStyle } from 'styled-components'

const GlobalStyle = createGlobalStyle`
  html, body, #root {
    height: 100%;
    width: 100%;
  }

  body {
    margin: 0;
    height: 100%;
    width: 100%;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
  
  .crt-border{
    border: 1px solid #eeeeee;
  }

  .crt-border:hover{
    box-shadow: 0px 0px 2px 2px ${criticPalette.light};
  }
  
  .crt-label-title{
    color: ${criticTheme.palette.primary.light};
    font-size: 22px;
  }
  
  .crt-comment-tooltip{
    max-width: unset !important;
    background-color: ${criticPalette.light} !important;
    color: ${criticPalette.primary} !important;
    font-size: 13px !important;
  }

  .crt-error{
    display: block;
    color: red;
    font-size: 12px;
    width: 100%;
    text-align: left;
  }
`

export default GlobalStyle