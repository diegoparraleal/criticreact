/* eslint-disable react-hooks/exhaustive-deps */
import { ROLES, apiService} from 'app/services/apiService';
import { Button } from '@material-ui/core';
import RestaurantCard from 'app/components/restaurant.card';
import { CriticStore, CriticActions } from 'app/store/store';
import React, { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import RestaurantsHeader from './restaurants.header';
import RestaurantsHeaderOwner from './restaurants.header.owner'
import { useHistory } from 'react-router-dom';
import RestaurantEditable from 'app/components/restaurant.editable';
import ConfirmDialog from 'app/components/confirm.dialog';

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
    const [addingRestaurant, setAddingRestaurant] = useState(false);
    const [editingRestaurant, setEditingRestaurant] = useState(null);
    const [deletingRestaurant, setDeletingRestaurant] = useState(null);
    const {state, dispatch} = useContext(CriticStore)
    const restaurants = state.restaurants
    const appUser = state.appUser
    const restaurantsHaveMoreResults = state.restaurantsHaveMoreResults

    useEffect(() => {
        if (appUser === null) return;
        apiService.loadRestaurants(filter.rating, filter.name, filter.page, (appUser.role === ROLES.OWNER ? appUser.id : null))
                  .then(restaurants => {
                    if (filter.page > 0)
                        return dispatch(CriticActions.appendRestaurants(restaurants))
                    else if (filter.page === 0 && restaurants.length === 0)
                        return dispatch(CriticActions.setRestaurants([]))
                    else
                        return dispatch(CriticActions.setRestaurants(restaurants)) 
                  })
    }, [filter])

    const addRestaurant = () => setAddingRestaurant(true)
    const cancelRestaurantAddition = () => setAddingRestaurant(false)
    const performAddRestaurant = (restaurant) => {
        restaurant.owner = appUser.id;
        apiService.addRestaurant(restaurant)
                  .then(() => {
                      setAddingRestaurant(false)
                      setFilter({...filter, page: 0})
                  })
    }
    const editRestaurant = (restaurant) => setEditingRestaurant(restaurant)
    const cancelRestaurantEdition = () => setEditingRestaurant(null)
    const performEditRestaurant = (restaurant) => {
        apiService.editRestaurant(restaurant)
                  .then(() => {
                      setEditingRestaurant(null)
                      setFilter({...filter, page: 0})
                  })
    }
    const deleteRestaurant = (restaurant) => setDeletingRestaurant(restaurant)
    const cancelRestaurantDeletion = () => setDeletingRestaurant(null)
    const performDeleteRestaurant = () => {
        apiService.deleteRestaurant(deletingRestaurant.id)
                  .then(() => {
                      setDeletingRestaurant(null)
                      setFilter({...filter, page: 0})
                  })
    }
    const goToReviews = (restaurantId) => history.push(`/restaurants/${restaurantId}`)
    const loadMore = () => setFilter({...filter, page: filter.page + 1})
    const changeFilter = (newFilter) => setFilter({...newFilter, page:0})

    return (
        <StyledRestaurantsContainer>
            {addingRestaurant && 
                <RestaurantEditable title="Add Restaurant" confirmButton="Add" 
                                    onCancel={cancelRestaurantAddition} onConfirm={performAddRestaurant} />
            }
            {editingRestaurant && 
                <RestaurantEditable restaurant={editingRestaurant} title="Edit Restaurant" confirmButton="Edit" 
                                    onCancel={cancelRestaurantEdition} onConfirm={performEditRestaurant} />
            }
            {deletingRestaurant && 
                <ConfirmDialog title="Delete Restaurant" message="Are you sure you want to delete this restaurant?" 
                               onCancel={cancelRestaurantDeletion} onConfirm={() => performDeleteRestaurant()} />
            }
            {appUser?.role === "owner" &&
                <RestaurantsHeaderOwner onAddRestaurantClick={addRestaurant}/>
            }
            <RestaurantsHeader filter={filter} onFilterChanged={changeFilter}/>
            <div id="crt-restaurants-content">
                {restaurants.map(restaurant => (
                    <RestaurantCard key={restaurant.id} 
                                    restaurant={restaurant}
                                    showEdit={appUser.role === ROLES.OWNER || appUser.role === ROLES.ADMIN}
                                    showDelete={appUser.role === ROLES.ADMIN}
                                    onDeleteClick={() => deleteRestaurant(restaurant) }
                                    onEditClick={() => editRestaurant(restaurant) }
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