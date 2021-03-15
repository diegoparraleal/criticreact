import { ROLES, apiService} from 'app/services/apiService';
import { Button } from '@material-ui/core';
import RestaurantCard from 'app/components/restaurant.card';
import { CriticStore, CriticActions } from 'app/store/store';
import React, { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import RestaurantsHeader from './restaurants.header';
import RestaurantsHeaderOwner from './restaurants.header.owner'
import { useHistory } from 'react-router-dom';

const StyledRestaurantsContainer = styled.div`
  #crt-restaurants-loadmore{
    width: 100%;
    text-align: center;
    margin: 16px 0;
    height: 48px;
  }
`;

function RestaurantsContainer() {
    const history = useHistory()
    const [filter, setFilter] = useState({rating: 0, name: "", page: 0})
    const {state, dispatch} = useContext(CriticStore)
    const restaurants = state.restaurants
    const appUser = state.appUser
    const restaurantsHaveMoreResults = state.restaurantsHaveMoreResults

    useEffect(() => {
        apiService.loadRestaurants(filter.rating, filter.name, filter.page, null)
                  .then(restaurants => {
                    if (filter.page > 0 && restaurants.length > 0)
                        return dispatch(CriticActions.appendRestaurants(restaurants))
                    else if (filter.page > 0 && restaurants.length === 0)
                        return dispatch(CriticActions.setRestaurants([]))
                    else
                        return dispatch(CriticActions.setRestaurants(restaurants)) 
                  })
    }, [filter])

    const deleteRestaurant = () => {}
    const editRestaurant = () => {}
    const goToReviews = (restaurantId) => history.push(`/restaurants/${restaurantId}`)
    const loadMore = () => {
        setFilter({...filter, page: filter.page + 1})
    }
    const changeFilter = (newFilter) => {
        setFilter({...newFilter, page:0})
    }

    return (
        <StyledRestaurantsContainer>
            {appUser?.role === "owner" &&
                <RestaurantsHeaderOwner/>
            }
            <RestaurantsHeader filter={filter} onFilterChanged={changeFilter}/>
            <div id="crt-restaurants-content">
                {restaurants.map(restaurant => (
                    <RestaurantCard key={restaurant.id} 
                                    restaurant={restaurant}
                                    showEdit={appUser.role === ROLES.OWNER || appUser.role === ROLES.ADMIN}
                                    showDelete={appUser.role === ROLES.ADMIN}
                                    onDeleteClick={deleteRestaurant}
                                    onEditClick={editRestaurant}
                                    onReviewsClick={goToReviews} />
                ))}
                
            </div>
            <div id="crt-restaurants-loadmore">
                {restaurantsHaveMoreResults && 
                    <Button variant="outlined" color="secondary" onClick={loadMore}>Load more</Button>
                }                
            </div>
        </StyledRestaurantsContainer>
    );
}

export default RestaurantsContainer;