import React from 'react';
import styled from 'styled-components';
import BusinessIcon from '@material-ui/icons/Business';
import { Button, Typography } from '@material-ui/core';
import {CRITICPALETTE} from './../../theme/theme'

const StyledRestaurantHeaderOwner = styled.div`
  margin: 32px 0;
  height: 64px;
  position: relative;

  label{
    font-size: 30px;
    line-height: 64px;
  }
  
  .crt-addRestaurant{
    position: absolute;
    right: 0px;
    color: ${CRITICPALETTE.light};

    h5{
      margin-left: 8px;
      line-height: 30px;
      display: inline-block;
      cursor: pointer;
    }
  }
`

function RestaurantsHeaderOwner({onAddRestaurantClick}) {

    return (
        <StyledRestaurantHeaderOwner>
            <Typography variant="h4" component="label" className="crt-label-title">My restaurants</Typography>
            <Button variant="contained" color="primary" className="crt-addRestaurant"  onClick={onAddRestaurantClick} >
                <BusinessIcon/>
                <Typography component="h5">Add Restaurant</Typography>
            </Button>
        </StyledRestaurantHeaderOwner>
    )
}

export default RestaurantsHeaderOwner