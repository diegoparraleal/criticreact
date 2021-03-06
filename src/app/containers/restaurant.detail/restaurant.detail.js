/* eslint-disable react-hooks/exhaustive-deps */
import { Button } from '@material-ui/core';
import RestaurantCard from 'app/components/restaurant.card';
import { apiService, ROLES } from 'app/services/apiService';
import { CriticActions, CriticStore } from 'app/store/store';
import React, { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import ThumbDownIcon from '@material-ui/icons/ThumbDown';
import ReviewCard from 'app/components/review.card';
import { useParams } from 'react-router-dom';
import ReviewCardEditable from 'app/components/review.card.editable';
import ConfirmDialog from 'app/components/confirm.dialog';

const StyledRestaurantDetailContainer = styled.div`
    .crt-restaurant-detail-links{
        margin-top: 16px;
        font-size: 16px;

        Button{
            margin-right: 16px;
        }
    }
    .crt-restaurant-detail-addReview{
        margin: 16px 0;
    }
    .crt-restaurant-detail-topreviews{
        display: flex;
        margin-top: 32px;

        span {
            position: relative;
            width: 50%;

            &:first-child{
            width: 49%;
            margin-right: 1%;
            }

            &:last-child{
            width: 49%;
            margin-left: 1%;
            }

            label{
            left: 16px;
            top: 8px;
            position: relative;

            mat-icon{
                top: 4px;
                position: relative;
                left: 8px;
            }
            }
        }
    }

    .crt-restaurant-detail-reviews{
        margin-top: 32px;
    }

    .crt-restaurant-detail-noreviews{
        margin-top: 32px;
        width: 100%;
        border: 1px solid mat-color($critic-accent);
        height: 128px;

        label{
            color: mat-color($critic-primary, 300);
            font-size: 18px;
            font-weight: 100;
            text-align: center;
            width: 100%;
            height: 100%;
            transform: translateY(calc(50% - 9px));
            display: inline-block;
        }
    }
    .crt-restaurant-detail-loadmore{
        width: 100%;
        text-align: center;
        margin: 16px 0;
        height: 48px;
    }
`

function RestaurantDetailContainer() {
    // @ts-ignore
    const {restaurantId} = useParams();
    const [fetchFlag, setFetchFlag] = React.useState(0);
    const [page, setPage] = useState(0)
    const [addingReview, setAddingReview] = useState(false)
    const [editingReview, setEditingReview] = useState(null)
    const [deletingReview, setDeletingReview] = useState(null)
    const [newReview, setNewReview] = useState({})
    const {state, dispatch} = useContext(CriticStore)
    const {appUser, restaurant: restaurantWithDetails , reviewsHaveMoreResults} = state
    const {bestReview, worstReview, reviews} = restaurantWithDetails
    const restaurant = restaurantWithDetails?.restaurant || {}

    useEffect(()=>{
        apiService.loadRestaurant(restaurantId)
                  .then(restaurant => dispatch(CriticActions.setRestaurant(restaurant)))
    }, [fetchFlag])

    const addReview = () => {
        setNewReview({
            comment: "",
            date: new Date(),
            userImage: appUser.image,
            user: appUser.id,
            rating: 0
        });
        setAddingReview(true)
    }
    const cancelAddition = () => {
        setNewReview({})
        setAddingReview(false)
    }
    const postReview = (review) => {
        setNewReview({})
        setAddingReview(false)
        apiService.postReview(restaurantId, {...review, })
                  .then( () => setFetchFlag(fetchFlag + 1))
    }
    const editReview = (review) => setEditingReview(review)
    const cancelEditingReview = () => setEditingReview(null)
    const performEditReview = (review) => {
        apiService.editReview(restaurantId, review.id, review)
                  .then( () => {
                        setEditingReview(null)
                        setFetchFlag(fetchFlag + 1)
                  })
        setEditingReview(null)
    }
    const deleteReview = (review) => setDeletingReview(review)
    const cancelDeletingReview = () => setDeletingReview(null)
    const performDeleteReview = () => {
        apiService.deleteReview(restaurantId, deletingReview.id)
                  .then( () => {
                        setDeletingReview(null)
                        setFetchFlag(fetchFlag + 1)
                  })
    }
    const postReply = (restaurantId, reviewId, reply) => {
        reply.user = appUser.id;
        apiService.postReply(restaurantId, reviewId, reply)
                  .then( () => setFetchFlag(fetchFlag + 1))
    }

    const loadMore = () => {
        setPage(page + 1)
        apiService.loadRestaurantReviews(restaurantId, page + 1)
                  .then(reviews => dispatch(CriticActions.appendRestaurantReviews(reviews)))
    }

    if (appUser === null) return (<>...</>)
    if (restaurant === {}) return (<>...</>)
    return (
        <StyledRestaurantDetailContainer>
            {deletingReview && 
                <ConfirmDialog title="Delete Review" message="Are you sure you want to delete this review?" 
                               onCancel={cancelDeletingReview} onConfirm={() => performDeleteReview()} />
            }
            <div className="crt-restaurant-detail-header">
                <RestaurantCard  restaurant={restaurant} showReviews={false} />
            </div>
            {appUser.role === ROLES.USER && !addingReview && 
                <div className="crt-restaurant-detail-links">
                    <Button variant="outlined" color="secondary" onClick={addReview} >Add a review</Button>
                </div>
            }
            {addingReview && 
                <div className="crt-restaurant-detail-addReview">
                    <ReviewCardEditable review={newReview} onCancel={cancelAddition} onAdd={postReview}/>
                </div>
            }
            {reviews?.length > 1 && 
                <div className="crt-restaurant-detail-topreviews">
                    <span className="crt-border">
                        <label className="crt-label-title">Best review <ThumbUpIcon/></label>
                        {bestReview  && 
                            <ReviewCard review={bestReview} showBorder={false}/>
                        }
                    </span>
                    <span className="crt-border">
                        <label className="crt-label-title">Worst review <ThumbDownIcon/></label>
                        {bestReview  && 
                            <ReviewCard review={worstReview} showBorder={false}/>
                        }
                    </span>
                </div>
            }
             {reviews?.length > 0 && 
                <div className="crt-restaurant-detail-reviews">
                <label className="crt-label-title">All reviews</label>
                {reviews.map( review => (
                    editingReview !== null && editingReview.id === review.id
                    ?<ReviewCardEditable key={review.id} review={review} editing={true} onCancel={cancelEditingReview} onEdit={performEditReview}/>
                    :<ReviewCard key={review.id}
                                review={review} 
                                showEdit={appUser?.role === ROLES.ADMIN}
                                showDelete={appUser?.role === ROLES.ADMIN}
                                showReplyButton={appUser?.role === ROLES.OWNER}
                                onEdit={editReview}
                                onDelete={deleteReview}
                                onReply={(reply) => postReply(restaurantId, review.id, reply) } />
                ))}
                </div>
            }
            {reviews?.length === 0 && !addingReview && 
                <div className="crt-restaurant-detail-noreviews">
                    <label>There are no reviews please add the first!</label>
                </div>
            }
            <div className="crt-restaurant-detail-loadmore">
            {reviewsHaveMoreResults && !addingReview && 
                <Button variant="outlined" color="secondary"  onClick={loadMore} >Load more</Button>
            }
            </div>

        </StyledRestaurantDetailContainer>
    );
}

export default RestaurantDetailContainer;