import React from 'react';
import { ThemeProvider } from '@material-ui/core/styles';
import { criticTheme } from './theme/theme'
import GlobalStyle from 'globalStyles';
import AppContainer from './containers/main/main';
import { CriticStoreProvider } from './store/store';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import {GOOGLE_API_KEY} from './../env'
import useScript from './hooks/useScript';

function App() {
  useScript(`https://maps.googleapis.com/maps/api/js?key=${GOOGLE_API_KEY}&libraries=places`)
  return (
    <CriticStoreProvider>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <ThemeProvider theme={criticTheme}>
          <AppContainer/>
          <GlobalStyle/>
        </ThemeProvider>
      </MuiPickersUtilsProvider>
    </CriticStoreProvider>
  );
}

export default App;
