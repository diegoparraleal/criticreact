// React store
import React, {createContext, useReducer} from 'react';

// Initial state
const initialState = {
    googleUser: null
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
        SET: "appUser.set"
    }
}

const CriticActions = {
    loginSuccess: (googleUser) => ({ type: ACTIONS.LOGIN.SUCCESS, payload: googleUser}),
    loginFailed: () => ({ type: ACTIONS.LOGIN.FAILED}),
    logout: () => ({ type: ACTIONS.LOGOUT}),
    setAppUser: (appUser) => ({ type: ACTIONS.APPUSER.SET, payload: appUser}),
}

// Reducers
const CriticStoreProvider = ( { children } ) => {
  const [state, dispatch] = useReducer((state, action) => {
    switch(action.type) {
      case ACTIONS.LOGIN.SUCCESS: return {...state, googleUser: action.payload};
      case ACTIONS.LOGIN.FAILED: return {...state, googleUser: null};
      case ACTIONS.LOGOUT: return {...state, googleUser: null};
      case ACTIONS.APPUSER.SET: return {...state, appUser: action.payload};
      default:
        throw new Error();
    };
  }, initialState)
  
  return <Provider value={{ state, dispatch }}>{children}</Provider>;
};

export { CriticActions, CriticStore, CriticStoreProvider }
