import React from 'react';
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom';
import styled from 'styled-components'
import SplashContainer from '../splash/splash';
import AppFooter from './app.footer';
import AppToolBar from './app.toolbar';

const StyledAppContainer = styled.div`
  max-width: 1080px;
  height: 100%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  font-family: 'Roboto';

  #crt-content{
    flex-grow: 1;
  }

  .ctr-footer{
      
  }
`

export default function AppContainer() {
  return (
      <StyledAppContainer>
        <AppToolBar></AppToolBar>
        <div id="crt-content">
        <Router>
            <Switch>
                <Route path="/">
                    <SplashContainer />
                </Route>
            </Switch>
        </Router>
        </div>
        <AppFooter className="crt-footer"/>
      </StyledAppContainer>
  );
}

