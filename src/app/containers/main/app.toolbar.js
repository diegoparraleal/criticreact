import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import styled from 'styled-components';
import logo from './../../images/logo.png'
import RestaurantIcon from '@material-ui/icons/Restaurant';
import RateReviewIcon from '@material-ui/icons/RateReview';
import PeopleIcon from '@material-ui/icons/People';
import AppUser from './app.user';
import { useContext } from 'react';
import { CriticStore } from 'app/store/store';
import { Button, IconButton } from '@material-ui/core';
import { CRITICPALETTE } from 'app/theme/theme';
import { useHistory } from 'react-router-dom';

const StyledAppToolBar = styled.div`
  display: block;

  img {
    height: 48px;
    cursor: pointer;
  } 
  #crt-menu-items{
    flex-grow: 1;
    text-align: right;

    button{
      color: ${CRITICPALETTE.light};
      display: inline-block;
      width: auto;
      font-size: inherit;

      svg{
        margin-right: 8px;
      }
    }
  }

  .crt-user{
    right: 0;
    height: 64px;
    width: 240px;
    position: relative;
    text-align: right;
  }
`

export default function AppToolBar({showRestaurants = false, showReviews = false, showUsers = false}) {
    const history = useHistory()
    const {state} = useContext(CriticStore)

    const goToRestaurants = () => history.push("/restaurants")
    const goToReviews = () => history.push("/reviews")
    const goToUsers = () => history.push("/users")

    return (
      <StyledAppToolBar>
        <AppBar position="relative">
          <Toolbar>
            <img src={logo} alt="Logo"/>
            <span id="crt-menu-items">
            { showRestaurants && 
              <IconButton onClick={goToRestaurants}>
                <RestaurantIcon/>
                <span>Restaurants</span>
              </IconButton>
            }
            { showReviews && 
              <IconButton onClick={goToReviews}>
                <RateReviewIcon/>
                <span>Pending Reviews</span>
              </IconButton>
            }
            { showUsers && 
              <IconButton onClick={goToUsers}>
                <PeopleIcon/>
                <span>Users</span>
              </IconButton>
            }
            </span>
            <AppUser className="crt-user" googleUser={state.googleUser} />
          </Toolbar>
        </AppBar>
      </StyledAppToolBar>
    );
}

