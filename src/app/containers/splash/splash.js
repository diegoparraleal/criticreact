import { Button } from '@material-ui/core';
import React from 'react';
import styled from 'styled-components';
import {criticPalette, screenSizes} from '../../theme/theme'
import splashImage from "./../../images/home-image.jpg"

const StyledSplashContainer = styled.div`
    img{
        width: 100%;
    }
    h3{
        color: ${criticPalette.primary};
        font-size: 24px;
        text-align: center;
        padding: 8px 0px;
        margin: 32px 0;
        font-weight: 300;
    }
    Button{
        left: calc(50% - 18px);
        margin-top: 24px;
    }

    @media only screen and (max-width: ${screenSizes.mobile}) {
        button{
            left: calc(50% - 30px);
            margin-top: 1000px;
        }
    }
`;

function SplashContainer() {
    return (
        <StyledSplashContainer>
            <h3 >Welcome to critic, the leading world site for restaurant reviews!</h3>
            <img src={splashImage} alt="HomeImage"/>
            <Button variant="contained" color="primary">Login</Button>
        </StyledSplashContainer>
    );
}

export default SplashContainer;