import { createMuiTheme } from '@material-ui/core/styles';

export const criticPalette ={
    primary: '#003433',
    secondary: '#ff5b33',
    light: '#c6d9b4'
}

export const criticTheme = createMuiTheme({
  palette: {
    primary: {
        main: criticPalette.primary,    
    },
    secondary: {
        main: criticPalette.secondary,
    },
    // @ts-ignore
    light: { 
        backgroundColor: criticPalette.light,
        color: '#000'
    }
  },
});


export const screenSizes = {
  desktop: '960px',
  tablet: '768px',
  "mobile-large": '640px',
  mobile: '480px',
  "mobile-small": '300px',
}