import { ROLES } from 'app/services/apiService';
import { CriticStore } from 'app/store/store';
import React, { useContext } from 'react';
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom';
import styled from 'styled-components'
import RegisterContainer from '../register/register';
import RestaurantDetailContainer from '../restaurant.detail/restaurant.detail';
import RestaurantsContainer from '../restaurants/restaurants';
import ReviewsContainer from '../reviews/reviews';
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

`

export default function AppContainer() {
  const {state} = useContext(CriticStore)
  const googleUser = state.googleUser
  const appUser = state.appUser
  const role = appUser?.role || ROLES.NONE;
  return (
      <StyledAppContainer>
        <Router>
          <AppToolBar showRestaurants={role === ROLES.OWNER || role === ROLES.ADMIN} showReviews={role === ROLES.OWNER} showUsers={role === ROLES.ADMIN} />
          <div id="crt-content">
              <Switch>
                  {googleUser != null && 
                    <>
                      <Route path="/register">
                          <RegisterContainer />
                      </Route>
                      <Route exact path="/restaurants/:restaurantId">
                        <RestaurantDetailContainer />
                      </Route>
                      <Route exact path="/restaurants">
                        <RestaurantsContainer />
                      </Route>
                      <Route exact path="/reviews">
                        <ReviewsContainer />
                      </Route>
                    </>
                  }
                  <Route path="/">
                      <SplashContainer />
                  </Route>
              </Switch>
          </div>
          <AppFooter/>
        </Router>
      </StyledAppContainer>
  );
}

