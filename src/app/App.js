import React from 'react';
import { ThemeProvider } from '@material-ui/core/styles';
import { criticTheme } from './theme/theme'
import GlobalStyle from 'globalStyles';
import AppContainer from './containers/main/main';
import { CriticStoreProvider } from './store/store';

function App() {
  return (
    <CriticStoreProvider>
      <ThemeProvider theme={criticTheme}>
        <AppContainer/>
        <GlobalStyle/>
      </ThemeProvider>
    </CriticStoreProvider>
  );
}

export default App;
