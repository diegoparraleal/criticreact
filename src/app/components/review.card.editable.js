import { Button, TextField } from '@material-ui/core';
import { Rating } from '@material-ui/lab';
import { KeyboardDatePicker } from '@material-ui/pickers';
import React, { useState } from 'react';
import styled from 'styled-components';
const StyledReviewCardEditable = styled.div`
    padding: 16px;

    .crt-review-card-header{
        position: relative;
        height: 72px;

        img{
            position: absolute;
            width: 64px;
            height: 64px;
            left: 0;
            top: 0;
        }
        .crt-review-editable-date{
            position: absolute;
            top: 0;
            left: 88px;
        }
        .crt-rating{
            position: absolute;
            top: 0;
            right: 0px;
        }
    }
    .crt-review-card-content{
        position: relative;
        margin: 16px 0;

        .crt-review-editable-comment{
            width: 100%;
        }
    }
    .crt-review-card-buttons{
        text-align: right;

        Button{
            margin-left: 16px;
        }
    }
`;

function ReviewCardEditable({review, showBorder = true, onCancel, onAdd}) {
    const [date, setDate] = useState(review.date)
    const [rating, setRating] = useState(review.rating)
    const [comment, setComment] = useState(review.comment)

    const add = () => onAdd({...review, date, rating, comment})

    return (
        <StyledReviewCardEditable className={showBorder ? "crt-border" : ""}>
            <form>
                <div className="crt-review-card-header">
                    <img src={review.userImage} alt="userImage"/>
                    <KeyboardDatePicker
                        disableToolbar
                        required
                        className="crt-review-editable-date"
                        variant="inline"
                        format="MM/dd/yyyy"
                        margin="normal"
                        id="date-picker-inline"
                        label="Date of visit"
                        value={date}
                        onChange={setDate}
                    />
                    <Rating name="reviewRating" className="crt-rating" precision={0.5} onChange={(_, value) => setRating(value)} value={rating} size="large" />
                </div>
                <div className="crt-review-card-content" >
                    <TextField required multiline className="crt-review-editable-comment" 
                                        value={comment}
                                        label="Please add a review" inputProps={{ maxLength: 4000 }} 
                                        onChange={(event) => setComment(event.target.value)} />
                </div>
                <div className="crt-review-card-buttons" >
                    <Button variant="outlined" color="secondary" onClick={onCancel}>Cancel</Button>
                    <Button variant="contained" color="secondary" onClick={add}>Add</Button>
                </div>
            </form>
        </StyledReviewCardEditable>
    )
}

export default ReviewCardEditable;