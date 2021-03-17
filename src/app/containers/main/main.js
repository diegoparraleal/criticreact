import { ROLES } from 'app/services/apiService';
import { CriticStore } from 'app/store/store';
import React, { useContext } from 'react';
import { Route, Switch, BrowserRouter as Router, Redirect } from 'react-router-dom';
import styled from 'styled-components'
import RegisterContainer from '../register/register';
import RestaurantDetailContainer from '../restaurant.detail/restaurant.detail';
import RestaurantsContainer from '../restaurants/restaurants';
import ReviewsContainer from '../reviews/reviews';
import SplashContainer from '../splash/splash';
import UsersContainer from '../users/users';
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
const SecuredRoute = (props) => {
  const {state} = useContext(CriticStore)
  const googleUser = state.googleUser
  if(googleUser) {
     return <Route {...props} />
  }
  return <Redirect to='/' />
}


export default function AppContainer() {
  const {state} = useContext(CriticStore)
  const appUser = state.appUser
  const role = appUser?.role || ROLES.NONE;
  return (
      <StyledAppContainer>
        <Router>
          <AppToolBar showRestaurants={role === ROLES.OWNER || role === ROLES.ADMIN} showReviews={role === ROLES.OWNER} showUsers={role === ROLES.ADMIN} />
          <div id="crt-content">
              <Switch>
                  <SecuredRoute exact path='/register'>
                    <RegisterContainer />
                  </SecuredRoute>
                  <SecuredRoute exact path='/restaurants/:restaurantId'>
                    <RestaurantDetailContainer />
                  </SecuredRoute>
                  <SecuredRoute exact path='/restaurants'>
                    <RestaurantsContainer />
                  </SecuredRoute>
                  <SecuredRoute exact path='/reviews'>
                    <ReviewsContainer />
                  </SecuredRoute>
                  <SecuredRoute exact path='/users'>
                    <UsersContainer />
                  </SecuredRoute>
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

