import { Button, TextField, Tooltip, Typography } from '@material-ui/core';
import { Rating } from '@material-ui/lab';
import { criticPalette } from 'app/theme/theme';
import React, { useState } from 'react';
import styled from 'styled-components';

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

        span:first-child{
          height: 64px;
          min-width: 64px;
          overflow: hidden;

          label{
            color: ${criticPalette.primary};
            font-weight: 400;
            line-height: 22px;
          }

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

function ReviewCard({review, editable = false, showBorder = true, showEdit = false, showDelete = false, showReplyButton = false,
                             onEdit = (_)=> {}, onDelete = (_)=> {}, onReply = ()=> {} , onCancel = () => {}}) {
    
    const [replyComment, setReplyComment] = useState("")
    const reply = review?.reply

    const formatDate = (date) => {
        if (date === null) return ""
        return new Date(date).toLocaleDateString('en-US')
    }

    return (
        <StyledReviewCard className={showBorder ? "crt-border" : ""}>
            <div className="crt-review-card-wrapper">
                <div className="crt-review-card-header">
                    <img src={review.userImage} alt="userImage"/>
                    <Typography component="h4">{formatDate(review.date)}</Typography>
                    <span className="crt-review-links">
                        {showEdit && 
                            <Button onClick={() => onEdit(review.id)}>Edit</Button>
                        }
                        {showDelete && 
                            <Button onClick={() => onDelete(review.id)}>Delete</Button>
                        }
                    </span>
                    <Rating name="reviewRating" className="crt-rating" value={review.rating} size="large" readOnly  />
                </div>
                <div className="crt-review-card-content">
                    <Tooltip open={review?.comment.length > 500} placement="top" title="Comment">
                        <p>{review.comment}</p>
                    </Tooltip>
                    {showReplyButton && 
                        <div className="crt-review-card-reply">
                            <span>
                            {review.reply 
                                ? <img src={review?.reply?.userImage} alt="userImage"/>
                                : <label >No reply yet</label>
                            }
                            </span>
                            <span>
                                <h4>{formatDate(review?.reply?.date)}</h4>
                                <Tooltip open={review?.reply?.comment.length > 500} placement="top" title="Comment">
                                    <p>{review?.reply?.comment}</p>
                                </Tooltip>
                            </span>
                        </div>
                    }
                </div>
                <form>
                    {showReplyButton && reply != null &&
                        <div className="crt-review-reply-editable" >
                            <TextField required multiline className="crt-review-reply-comment" 
                                        label="Please add a reply to this review" inputProps={{ maxLength: 4000 }} 
                                        onChange={(event) => setReplyComment(event.target.value)} />
                        </div>
                    }
                    {showReplyButton &&
                        <div className="crt-review-card-buttons" >
                            <Button variant="contained" color="secondary" onClick={() => onReply()}>Reply</Button>
                        </div>
                    }
                </form>
            </div>
        </StyledReviewCard>
    );
}


export default ReviewCard;