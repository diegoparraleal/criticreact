import { createMuiTheme } from '@material-ui/core/styles';

export const CRITICPALETTE ={
    primary: '#003433',
    secondary: '#ff5b33',
    light: '#c6d9b4'
}

export const CRITICTHEME = createMuiTheme({
  palette: {
    primary: {
        main: CRITICPALETTE.primary,    
    },
    secondary: {
        main: CRITICPALETTE.secondary,
    },
    // @ts-ignore
    light: { 
        backgroundColor: CRITICPALETTE.light,
        color: '#000'
    }
  },
});


export const SCREENSIZES = {
  desktop: '960px',
  tablet: '768px',
  "mobile-large": '640px',
  mobile: '480px',
  "mobile-small": '300px',
}