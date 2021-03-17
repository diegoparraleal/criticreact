/* eslint-disable react-hooks/exhaustive-deps */
import { Typography } from '@material-ui/core';
import ThumbUpAltOutlinedIcon from '@material-ui/icons/ThumbUpAltOutlined';
import ReviewCard from 'app/components/review.card';
import { apiService } from 'app/services/apiService';
import { CriticActions, CriticStore } from 'app/store/store';
import { CRITICPALETTE } from 'app/theme/theme';
import React, { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
const StyledReviewsContainer = styled.div`
  #crt-pending-reviews-header{
        margin: 32px 0;
        height: 64px;
        label{
            font-size: 30px !important;
            line-height: 64px;
        }
    }
    #crt-pending-reviews-content{
        .crt-review-card{
            margin-bottom: 32px;
            display: block;
        }
    }

    #crt-restaurant-detail-noreviews{
        margin-top: 32px;
        width: 100%;
        border: 1px solid ${CRITICPALETTE.secondary};
        height: 128px;

        label{
            color: ${CRITICPALETTE.primary};
            font-size: 18px;
            font-weight: 100;
            text-align: center;
            width: 100%;
            height: 100%;
            transform: translateY(calc(50% - 9px));
            display: inline-block;

            svg{
                top: 4px;
                position: relative;
                margin-left: 4px;
            }
        }
    }
`;

function ReviewsContainer() {
    const [fetchFlag, setFetchFlag] = useState(0)
    const {state, dispatch} = useContext(CriticStore)
    const {appUser, pendingReviews} = state

    useEffect( ()=> {
        apiService.loadPendingReviews(appUser.id)
                  .then(pendingReviews => dispatch(CriticActions.setPendingReviews(pendingReviews)))
    }, [fetchFlag])

    const postReply = (restaurantId, reviewId, reply) => {
        reply.user = appUser.id;
        apiService.postReply(restaurantId, reviewId, reply)
                  .then( () => setFetchFlag(fetchFlag + 1))
    }

    return (
        <StyledReviewsContainer>
            <div id="crt-pending-reviews-header">
                <Typography component="label" className="crt-label-title">Pending reviews</Typography>
            </div>
            {pendingReviews.length > 0 ?
                <div id="crt-pending-reviews-content">
                    {pendingReviews.map( reviewWithRestaurant => (
                        <div key={reviewWithRestaurant.review.id}>
                            <label className="crt-label-title">{reviewWithRestaurant.restaurant.name}</label>
                            <ReviewCard review={reviewWithRestaurant.review} className="crt-review-card" showReplyButton={true} 
                                        onReply={(reply) => postReply(reviewWithRestaurant.restaurant.id, reviewWithRestaurant.review.id, reply) } />
                        </div>
                    ))}
                </div>
                :
                <div id="crt-restaurant-detail-noreviews">
                    <label >There are no pending reviews. You are up to date! <ThumbUpAltOutlinedIcon/></label>
                </div>
            }        
        </StyledReviewsContainer>
    );
}


export default ReviewsContainer;