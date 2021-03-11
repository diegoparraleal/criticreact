import React from 'react';
import { ThemeProvider } from '@material-ui/core/styles';
import { criticTheme } from './theme/theme'
import GlobalStyle from 'globalStyles';
import AppContainer from './containers/main';

function App() {
  return (
    <ThemeProvider theme={criticTheme}>
      <AppContainer/>
      <GlobalStyle/>
    </ThemeProvider>
  );
}

export default App;
