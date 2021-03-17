import { Button, TextField, Tooltip, Typography } from '@material-ui/core';
import { Rating } from '@material-ui/lab';
import { CRITICPALETTE } from 'app/theme/theme';
import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import styled from 'styled-components';
import ReplyCardEditable from './reply.card.editable';

const StyledReviewCard = styled.div`
  position: relative;
  min-height: 100px;
  padding: 16px;
  margin-top: 16px;

  .crt-review-card-wrapper{
    position: relative;
    width: 100%;
    min-height: 100px;

    .crt-review-card-header{
      position: relative;
      height: 64px;
      min-width: 64px;
      overflow: hidden;
      margin-bottom: 8px;

      img{
        position: absolute;
        width: 64px;
        left: 0;
        top: 0;
      }

      > h4{
        left: 72px;
        top: 12px;
        width: 64px;
        display: inline-block;
        position: absolute;
        font-size: 14px;
        font-weight: 400;
        text-align: center;
        color: #dddddd;
      }

      .crt-review-links{
        position: absolute;
        top: 10px;
        right: 250px;
      }
      .crt-rating{
        position: absolute;
        top: 0;
        right: 0px;
      }
    }

    .crt-review-card-content{
      position: relative;

      > p{
        font-size: 14px;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 6;
        -webkit-box-orient: vertical;
        overflow: hidden;
        color: #888888;
      }

      .crt-review-card-reply{
        display: flex;

        h6{
          color: ${CRITICPALETTE.light};
          font-weight: 400;
          line-height: 22px;
          font-size: 14px;
        }

        span:first-child{
          height: 64px;
          min-width: 64px;
          overflow: hidden;

          img{
            display: block;
            width: 64px;
            left: 0;
            top: 0;
          }
        }

        span:last-child{
          flex-grow: 1;
          margin-left: 16px;

          h4{
            width: 64px;
            display: inline-block;
            font-size: 14px;
            font-weight: 400;
            color: #dddddd;
            margin: 0;
            font-style: italic;
          }

          p{
            font-size: 14px;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 6;
            -webkit-box-orient: vertical;
            overflow: hidden;
            color: #888888;
            font-style: italic;
          }
        }
      }
    }
  }

  

`

function ReviewCard({review, className = "", showBorder = true, showEdit = false, showDelete = false, showReplyButton = false,
                             onEdit = (_)=> {}, onDelete = (_)=> {}, onReply = ()=> {}}) {
    const reply = review?.reply
    const formatDate = (date) => {
        if (date === null) return ""
        return new Date(date).toLocaleDateString('en-US')
    }

    return (
        <StyledReviewCard className={showBorder ? `crt-border ${className}` : className}>
            <div className="crt-review-card-wrapper">
                <div className="crt-review-card-header">
                    <img src={review.userImage} alt="userImage"/>
                    <Typography component="h4">{formatDate(review.date)}</Typography>
                    <span className="crt-review-links">
                        {showEdit && 
                            <Button color="secondary" onClick={() => onEdit(review)}>Edit</Button>
                        }
                        {showDelete && 
                            <Button color="secondary" onClick={() => onDelete(review)}>Delete</Button>
                        }
                    </span>
                    <Rating name="reviewRating" precision={0.5}  className="crt-rating" value={review.rating} size="large" readOnly  />
                </div>
                <div className="crt-review-card-content">
                    <Tooltip open={review?.comment.length > 500} placement="top" title="">
                        <p>{review.comment}</p>
                    </Tooltip>
                    <div className="crt-review-card-reply">
                        {review.reply 
                            ? <span><img src={review?.reply?.userImage} alt="userImage"/></span>
                            : !showReplyButton ? <Typography component="h6">No reply yet</Typography> : <></>
                        }
                        {review.reply != null &&
                          <span>
                              <h4>{formatDate(review?.reply?.date)}</h4>
                              <Tooltip open={review?.reply?.comment.length > 500} placement="top" title="">
                                  <p>{review?.reply?.comment}</p>
                              </Tooltip>
                          </span>
                          }
                    </div>
                    {showReplyButton && reply === null &&
                      <ReplyCardEditable reply={reply} onReply={onReply}/>
                    }
                </div>
                
            </div>
        </StyledReviewCard>
    );
}

export default ReviewCard;