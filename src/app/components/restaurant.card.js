import { Button, Typography } from '@material-ui/core';
import { Rating } from '@material-ui/lab';
import React from 'react';
import styled from 'styled-components';

const StyledRestaurantCard = styled.div`
  position: relative;
  min-height: 236px;
  padding: 16px;
  margin-top: 16px;

  .crt-restaurant-card-wrapper{
    position: relative;
    width: 100%;
    min-height: 236px;


    .crt-restaurant-card-image{
      position: absolute;
      width: 300px;
      height: 200px;
      left: 0;
      top: 0;
      overflow: hidden;

      img{
        width: 300px;
      }
    }

    h2{
      left: 324px;
      top: 0;
      display: inline-block;
      position: absolute;
      font-size: 24px;
      font-weight: 400;
    }
    h3{
      left: 324px;
      top: 40px;
      display: inline-block;
      position: absolute;
      font-size: 12px;
    }
    h4{
      left: 324px;
      top: 54px;
      display: inline-block;
      position: absolute;
      font-size: 12px;
    }
    .crt-rating{
      position: absolute;
      top: 0;
      right: 0px;
    }
    p{
      left: 324px;
      top: 88px;
      position: absolute;
      font-size: 14px;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 6;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }

    .crt-restaurant-card-links{
      position: absolute;
      right: 0px;
      bottom: 0px;

      .crt-button{
        margin-right: 16px;
        cursor: pointer;
        text-decoration: underline;
      }
    }
  }
`;

function RestaurantCard({restaurant, showEdit = false, showDelete = false, showReviews = true, 
                         onEditClick = (_) => {}, 
                         onDeleteClick  = (_) => {}, 
                         onReviewsClick  = (_) => {}}) {
    if (restaurant === {}) return (<>...</>)
    return (
        <StyledRestaurantCard className="crt-border">
             <div className="crt-restaurant-card-wrapper">
                <span className="crt-restaurant-card-image">
                    <img src={restaurant.image} alt="restaurantImage"/>
                </span>
                <Typography component="h2">{restaurant.name}</Typography>
                <Typography component="h3">{restaurant.city} - ${restaurant.price}</Typography>
                <Typography component="h4">{restaurant.address}</Typography>
                <Rating name="restaurantRating" className="crt-rating" value={restaurant?.rating || 0} size="large" readOnly  />
                <p>{restaurant.description}</p>
                <span className="crt-restaurant-card-links">
                    {showEdit && <Button className="crt-button" onClick={() => onEditClick(restaurant.id)} >Edit</Button>}
                    {showDelete && <Button className="crt-button" onClick={() => onDeleteClick(restaurant.id) } >Delete</Button>}
                    {showReviews && <Button className="crt-button" onClick={() => onReviewsClick(restaurant.id) } >Reviews</Button>}
                </span>
            </div>
        </StyledRestaurantCard>
    );
}



export default RestaurantCard;