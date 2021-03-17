import { Button, Typography } from '@material-ui/core';
import { CRITICTHEME } from 'app/theme/theme';
import React from 'react';
import styled from 'styled-components';
const StyledUserCard = styled.div`
    position: relative;
    min-height: 80px;
    padding: 16px;
    margin-top: 16px;

    .crt-user-card-wrapper{
        position: relative;
        width: 100%;

        img{
            position: absolute;
            width: 64px;
            height: 64px;
            left: 0;
            top: 0;
        }

        > h2, h3, h4{
            left: 80px;
            display: inline-block;
            position: absolute;
            font-size: 22px;
            font-weight: 400;
            text-align: center;
        }

        > h3, h4{
            top: 32px;
            font-size: 18px;
            color: ${CRITICTHEME.palette.primary.light}
        }

        > h4{
            left: 0px;
            top: 68px;
            width: 64px;
            text-align: center;
            font-size: 16px;
            text-transform: capitalize;
        }
    }
    .crt-user-card-links{
        position: absolute;
        right: 0px;
        bottom: 0px;

        .crt-button{
            margin-right: 16px;
            cursor: pointer;
            text-decoration: underline;
        }
    }
`;

function UserCard({user, onEdit, onDelete}) {
    return (
        <StyledUserCard className="crt-user-card crt-border">
            <div className="crt-user-card-wrapper">
                <span className="crt-user-card-image">
                    <img src={user.image} alt="userImage"/>
                </span>
                <Typography color="primary" component="h2">{user.name}</Typography>
                <Typography component="h3">{user.email}</Typography>
                <Typography component="h4">{user.role}</Typography>
            </div>
            <span className="crt-user-card-links">
                <Button color="secondary" className="crt-button" onClick={() => onEdit(user)} >Edit</Button>
                <Button color="secondary" className="crt-button" onClick={() => onDelete(user)} >Delete</Button>
            </span>
        </StyledUserCard>
    );
}

export default UserCard