import React from "react";
import styled from "styled-components";
import {criticPalette} from '../../theme/theme'

const StyledUser = styled.span`
    right: 0;
    height: 64px;
    width: 240px;
    position: relative;
    text-align: right;
    display: inline-block;

    #ctr-name{
        font-size: 22px;
        position: absolute;
        right: 72px;
        top: 4px;
        color: ${criticPalette.light};
    }
    #ctr-email{
        font-size: 12px;
        position: absolute;
        right: 72px;
        top: 30px;
        color: ${criticPalette.light};
    }
    img {
        margin: 0 8px;
        top: 8px;
        position: relative;
        border-radius: 24px;
        height: 48px;
    }
`

export default function AppUser({className}){
    return (
        <StyledUser className={className}>
            <label id="ctr-name">Diego Parra</label>
            <label id="ctr-email">diego.parra.leal@gmail.com</label>
            <img  src="https://lh3.googleusercontent.com/a-/AOh14Ggg_uw6vJGERDZ1CE88_oK8_P0pR6kp3y9hGO6ECw=s96-c" alt="userImage" />
        </StyledUser>
    )
}