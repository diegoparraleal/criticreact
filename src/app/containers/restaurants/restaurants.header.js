import React from 'react';
import styled from 'styled-components';
import SearchIcon from '@material-ui/icons/Search';
import ClearIcon from '@material-ui/icons/Clear';
import {IconButton, TextField, Typography } from '@material-ui/core';
import { Rating } from '@material-ui/lab';

const StyledRestaurantHeader = styled.div`
  width: 100%;
  margin-top: 16px;
  display: flex;

  #crt-text-filter {
    flex-grow: 1;
    display: flex;
    padding-top: 12px;

    .crt-search-icon{
      position: relative;
      margin-right: 8px;
      margin-top: 14px;
    }

    .crt-textfield{
      flex-grow: 1;
    }
  }

  #crt-rating-filter{
    margin-left: 64px;
    margin-top: 16px;

    h6{

      display: block;
      text-align: right;
      position: relative;
      right: 12px;
      font-size: 12px;

    }
  }
`

function RestaurantsHeader({filter, onFilterChanged}) {

  const filterRestaurantsByText = (event) => { 
    onFilterChanged({...filter, name: event.target.value  }) 
  }
  const filterRestaurantsByRating = (_, value) => { 
    onFilterChanged({...filter, rating: value}) 
  }
  const clearTextFilter = () => {
    onFilterChanged({...filter, name: ""}) 
  }

  return (
      <StyledRestaurantHeader>
        <span id="crt-text-filter">
          <IconButton aria-label="search" className="crt-search-icon" onClick={filterRestaurantsByText}>
            <SearchIcon />
          </IconButton>
          <TextField id="standard-basic" className="crt-textfield" 
                     value={filter.name}
                     label="Type some text to filter out restaurants" 
                     onChange={filterRestaurantsByText} />
          <IconButton aria-label="clear" onClick={clearTextFilter}>
            <ClearIcon />
          </IconButton>
        </span>
        <span id="crt-rating-filter">
          <Typography component="h6">Filter by minimum rating</Typography>
          <Rating name="filterRating" precision={0.5} onChange={filterRestaurantsByRating} value={filter.rating} size="large" />
        </span>
      </StyledRestaurantHeader>
  )
}

export default RestaurantsHeader