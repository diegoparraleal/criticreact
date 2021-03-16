import { Button, TextField } from '@material-ui/core';
import { Rating } from '@material-ui/lab';
import { KeyboardDatePicker } from '@material-ui/pickers';
import { datePickerDefaultProps } from '@material-ui/pickers/constants/prop-types';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import styled from 'styled-components';
import ErrorMessage from './error.message';
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
    const {handleSubmit, errors, control} = useForm();
    const add = ({date, rating, comment}) => onAdd({...review, date, rating, comment})
    return (
        <StyledReviewCardEditable className={showBorder ? "crt-border" : ""}>
            <form onSubmit={handleSubmit(add)}>
                <div className="crt-review-card-header">
                    <img src={review.userImage} alt="userImage"/>
                    <span className="crt-review-editable-date" >
                        <Controller control={control} name="date" defaultValue={review.date}
                                    rules={{ required: "The date is required" }}
                                    render={(props) => (
                                        <KeyboardDatePicker defaultValue={datePickerDefaultProps}  disableToolbar variant="inline" format="MM/dd/yyyy" margin="normal"  
                                                            label="Date of visit" name="date" value={props.value} onChange={props.onChange} />
                                    )} />
                        <ErrorMessage errors={errors} name="date"/>
                    </span>
                    <span className="crt-rating" >
                        <Controller control={control} name="rating" defaultValue={review.rating} 
                                    rules={{ min: { value: 0.5, message: "The rating is required"} }}
                                    render={(props) => (
                                        <Rating name="reviewRating"  precision={0.5}  value={props.value} size="large"
                                                onChange={(e, newValue) => props.onChange(newValue)} />
                                    )} />
                        <ErrorMessage errors={errors} name="rating"/>
                    </span>
                </div>
                <div className="crt-review-card-content" >
                    <Controller control={control} name="comment" defaultValue={review.comment} 
                                rules={{ required: "The comment is required" }}
                                    render={(props) => (
                                        <TextField  multiline className="crt-review-editable-comment"  name="comment" value={props.value} 
                                                    label="Please add a review" onChange={props.onChange} inputProps={{ maxLength: 4000 }} />
                                    )} />
                    <ErrorMessage errors={errors} name="comment"/>
                </div>
                <div className="crt-review-card-buttons" >
                    <Button variant="outlined" color="secondary" onClick={onCancel}>Cancel</Button>
                    <Button variant="contained" color="secondary" type="submit">Add</Button>
                </div>
            </form>
        </StyledReviewCardEditable>
    )
}

export default ReviewCardEditable;