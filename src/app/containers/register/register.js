import { ROLES, apiService} from 'app/services/apiService';
import { CriticActions, CriticStore } from 'app/store/store';
import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import clientImage from "./../../images/restaurantClient.jpg"
import ownerImage from "./../../images/restaurantOwner.jpg"
import {CRITICPALETTE} from "./../../theme/theme"

const StyledRegisterContainer = styled.div`
    #ctr-register-label{
        color: ${CRITICPALETTE.primary};
        font-size: 24px;
        text-align: center;
        padding: 8px 0px;
        margin: 32px 0;
        width: 100%;
        display: inline-block;
        margin-top: 128px;
    }

    #ctr-register-wrapper{
        margin: auto;
        overflow: hidden;
        display: inline-block;
        text-align: center;
        width: 100%;

        > span{
            display: inline-block;
            margin: 8px;
            padding: 8px;
            border: 1px solid transparent;
            cursor: pointer;

            &:hover{
                box-shadow: ${CRITICPALETTE.secondary} 0px 0px 8px 0px;
            }

            img{
                width: 320px;
                height: 320px;
            }
            label{
                display: block;
                color: ${CRITICPALETTE.primary};
                text-align: center;
                font-size: 22px;
                margin-top: 16px;
            }
        }
    }


    @media only screen and (max-width: $mobile) {
        #ctr-register-label{
            margin: 16px 0;
        }

        #ctr-register-wrapper{
            > span{
                img{
                    width: 240px;
                    height: 240px;
                }
                label{
                    font-size: 16px;
                    margin-top: 8px;
                }
            }
        }
    }
`;

function RegisterContainer() {
    const [fetchFlag, setFetchFlag] = useState(0)
    const {state, dispatch} = useContext(CriticStore)
    const history = useHistory()
    const googleUser = state.googleUser
    const appUser = state.appUser

    useEffect(() => {
        if (!googleUser) return
        if (appUser) return
        
        apiService.loadAppUserByEmail(googleUser.email)
                  .then(appUser => validateAppUser(appUser) )
                  .catch( () => dispatch(CriticActions.setAppUser(null)) )
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [appUser, googleUser, fetchFlag])

    const validateAppUser = (appUser) => {
        dispatch(CriticActions.setAppUser(appUser))
        if (appUser.role !== ROLES.NONE){
            history.push("/restaurants")
        }
    }
    
    const selectRestaurantClient = () => {
        apiService.createAppUser({
            name: googleUser.name,
            email: googleUser.email,
            image: googleUser.imageUrl,
            role:  ROLES.USER
        }).then( () => setFetchFlag(fetchFlag + 1) );
    }

    const selectRestaurantOwner = () => {
        apiService.createAppUser({
            name: googleUser.name,
            email: googleUser.email,
            image: googleUser.imageUrl,
            role:  ROLES.ADMIN
        }).then( () => setFetchFlag(fetchFlag + 1) );
    }

    return (
        <StyledRegisterContainer>
            <label id="ctr-register-label" >Please select your role in the application</label>
            <div id="ctr-register-wrapper">
                <span onClick={selectRestaurantClient}>
                    <img src={clientImage} alt="clientImage" />
                    <label >I am a restaurant customer</label>
                </span>
                <span onClick={selectRestaurantOwner}>
                    <img src={ownerImage} alt="ownerImage"/>
                    <label >I am a restaurant owner</label>
                </span>
            </div>
        </StyledRegisterContainer>
    );
}

export default RegisterContainer;