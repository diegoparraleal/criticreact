import { Menu, MenuItem } from "@material-ui/core";
import { CriticStore, CriticActions } from "app/store/store";
import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import {CRITICPALETTE} from '../../theme/theme'
import * as env from '../../../env'
import { useGoogleLogout } from "react-google-login";

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
        color: ${CRITICPALETTE.light};
    }
    #ctr-email{
        font-size: 12px;
        position: absolute;
        right: 72px;
        top: 30px;
        color: ${CRITICPALETTE.light};
    }
    img {
        margin: 0 8px;
        top: 8px;
        position: relative;
        border-radius: 24px;
        height: 48px;
    }
`

export default function AppUser({className, googleUser}){
    const [anchorEl, setAnchorEl] = React.useState(null);
    const {dispatch} = useContext(CriticStore)
    const history = useHistory();
    const clientId = env.GOOGLE_OAUTH_CLIENTID
    const showMenu = (event) => setAnchorEl(event.currentTarget)
    const closeMenu = () => setAnchorEl(null)
    const logout = () => {
        setAnchorEl(null)
        signOut()
        history.push("/")
    }

    const onLogoutSuccess = (res) => {
        console.log('Logged out Success');
        dispatch(CriticActions.logout())
    };

    const onFailure = () => {
        console.log('Handle failure cases');
    };

    const { signOut } = useGoogleLogout({
        clientId,
        onLogoutSuccess,
        onFailure,
    });

    if (googleUser == null) return (<></>)
    return (
        <StyledUser className={className} >
            <label id="ctr-name">{googleUser.name}</label>
            <label id="ctr-email">{googleUser.email}</label>
            <img  src={googleUser.imageUrl} alt="userImage" onClick={showMenu}/>
            {anchorEl != null && 
                <Menu id="simple-menu" anchorEl={anchorEl}  open={Boolean(anchorEl)} onClose={closeMenu} keepMounted
                    getContentAnchorEl={null}
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'center',
                    }}
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'center',
                    }}
                >
                    <MenuItem onClick={logout}>Logout</MenuItem>
                </Menu>
            }
        </StyledUser>
    )
}