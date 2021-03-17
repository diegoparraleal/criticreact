// React store
import React, {createContext, useReducer} from 'react';

// App Constants
const RESTAURANTS_PER_PAGE = 5;
const REVIEWS_PER_PAGE = 5;

// Initial state
const initialState = {
    googleUser: null,
    appUser: null,
    restaurants: [],
    restaurantsHaveMoreResults: false,
    restaurant: {},
    reviewsHaveMoreResults: false,
    pendingReviews: [],
    users: []
};
const CriticStore = createContext(null);
const { Provider } = CriticStore;

// Actions
const ACTIONS = {
    LOGIN: { 
        SUCCESS: "login.success",
        FAILED: "login.failed"
    },
    LOGOUT: "logout",
    APPUSER: {
        SET: "appUser.set",
    },
    RESTAURANTS: {
        SET: "restaurants.set",
        APPEND: "restaurants.append",
    },
    RESTAURANT: {
        SET: "restaurant.set",
        APPENDREVIEWS: "restaurant.appendReviews",
    },
    REVIEWS: {
        PENDING: "reviews.pending"
    },
    USERS: {
        SET: "users.set"
    },
}

const CriticActions = {
    loginSuccess: (googleUser) => ({ type: ACTIONS.LOGIN.SUCCESS, payload: googleUser}),
    loginFailed: () => ({ type: ACTIONS.LOGIN.FAILED}),
    logout: () => ({ type: ACTIONS.LOGOUT}),
    setAppUser: (appUser) => ({ type: ACTIONS.APPUSER.SET, payload: appUser}),
    setRestaurants: (restaurants) => ({ type: ACTIONS.RESTAURANTS.SET, payload: restaurants}),
    appendRestaurants: (restaurants) => ({ type: ACTIONS.RESTAURANTS.APPEND, payload: restaurants}),
    setRestaurant: (restaurant) => ({ type: ACTIONS.RESTAURANT.SET, payload: restaurant}),
    appendRestaurantReviews: (reviews) => ({ type: ACTIONS.RESTAURANT.APPENDREVIEWS, payload: reviews}),
    setPendingReviews: (pendingReviews) => ({ type: ACTIONS.REVIEWS.PENDING, payload: pendingReviews}),
    setUsers: (users) => ({ type: ACTIONS.USERS.SET, payload: users}),
}

// Reducers
const CriticStoreProvider = ( { children } ) => {
  const [state, dispatch] = useReducer((state, action) => {
    switch(action.type) {
      case ACTIONS.LOGIN.SUCCESS: return {...state, googleUser: action.payload};
      case ACTIONS.LOGIN.FAILED: return {...state, googleUser: null};
      case ACTIONS.LOGOUT: return {...state, googleUser: null};
      case ACTIONS.APPUSER.SET: return {...state, appUser: action.payload};
      case ACTIONS.RESTAURANTS.SET: return {...state, restaurants: action.payload, 
                                                      restaurantsHaveMoreResults: action.payload.length >= RESTAURANTS_PER_PAGE};
      case ACTIONS.RESTAURANTS.APPEND: return {...state, restaurants: [...state.restaurants, ...action.payload], 
                                                         restaurantsHaveMoreResults: action.payload.length >= RESTAURANTS_PER_PAGE};
      case ACTIONS.RESTAURANT.SET: return {...state, restaurant: action.payload,
                                                     reviewsHaveMoreResults: action.payload?.reviews?.length >= REVIEWS_PER_PAGE };
      case ACTIONS.RESTAURANT.APPENDREVIEWS: return {...state, restaurant: {...state.restaurant, reviews: [...state.restaurant.reviews, ...action.payload]},
                                                               reviewsHaveMoreResults: action.payload.length >= REVIEWS_PER_PAGE };
      case ACTIONS.REVIEWS.PENDING: return {...state, pendingReviews: action.payload};
      case ACTIONS.USERS.SET: return {...state, users: action.payload};
      default:
        throw new Error();
    };
  }, initialState)
  
  return <Provider value={{ state, dispatch }}>{children}</Provider>;
};

export { CriticActions, CriticStore, CriticStoreProvider, RESTAURANTS_PER_PAGE, REVIEWS_PER_PAGE}
