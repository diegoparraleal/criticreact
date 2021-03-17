import { CRITICPALETTE, CRITICTHEME } from 'app/theme/theme'
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
    box-shadow: 0px 0px 2px 2px ${CRITICPALETTE.light};
  }
  
  .crt-label-title{
    color: ${CRITICTHEME.palette.primary.light};
    font-size: 22px;
    font-family: 'Roboto';
  }
  
  .crt-comment-tooltip{
    max-width: unset !important;
    background-color: ${CRITICPALETTE.light} !important;
    color: ${CRITICPALETTE.primary} !important;
    font-size: 13px !important;
    font-family: 'Roboto';
  }

  .crt-error{
    display: block;
    color: red;
    font-size: 12px;
    width: 100%;
    text-align: left;
    font-family: 'Roboto';
  }

  .crt-dialog-content {
      width: 640px;

      > div {
          width: 100%;
          margin-bottom: 16px;
      }
  }

  .crt-title{
      text-transform: uppercase;
  }

  .MuiDialog-paperWidthSm .crt-error {
      margin-top: -14px
  }
`

export default GlobalStyle