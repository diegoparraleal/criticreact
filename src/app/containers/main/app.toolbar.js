import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import styled from 'styled-components';
import logo from './../../images/logo.png'
import RestaurantIcon from '@material-ui/icons/Restaurant';
import RateReviewIcon from '@material-ui/icons/RateReview';
import PeopleIcon from '@material-ui/icons/People';
import AppUser from './app.user';

const StyledAppToolBar = styled.div`
  display: block;

  img {
    height: 48px;
    cursor: pointer;
  } 

  .crt-user{
    right: 0;
    height: 64px;
    width: 240px;
    position: absolute;
    text-align: right;
  }
`

export default function AppToolBar({showRestaurants = false, showReviews = false, showUsers = false}) {
    return (
      <StyledAppToolBar>
        <AppBar position="relative">
          <Toolbar>
            <img src={logo} alt="Logo"/>
            { showRestaurants && 
              <button >
                <RestaurantIcon/>
                <span>Restaurants</span>
              </button>
            }
            { showReviews && 
              <button>
                <RateReviewIcon/>
                <span>Pending Reviews</span>
              </button>
            }
            { showUsers && 
              <button>
                <PeopleIcon/>
                <span>Users</span>
              </button>
            }
            <AppUser className="crt-user"/>
          </Toolbar>
        </AppBar>
      </StyledAppToolBar>
    );
}

