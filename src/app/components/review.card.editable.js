import { Button } from '@material-ui/core';
import React from 'react';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import RequiredDate from './validations/required.date';
import RequiredRating from './validations/required.rating';
import RequiredText from './validations/required.text';
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
        margin-top: 16px;
        Button{
            margin-left: 16px;
        }
    }
`;

function ReviewCardEditable({review, showBorder = true, editing=false, onCancel = () => {}, onAdd = (_) => {}, onEdit = (_) => {}}) {
    const {handleSubmit, errors, control} = useForm();
    const confirm = ({date, rating, comment, replyComment}) => {
        if (!editing) return onAdd({...review, date, rating, comment})
        onEdit({...review, date, rating, comment, reply: (review.reply != null ? {...review.reply, comment: replyComment} : null)})
    }
    if (review === null) return (<>...</>)
    return (
        <StyledReviewCardEditable className={showBorder ? "crt-border" : ""}>
            <form onSubmit={handleSubmit(confirm)}>
                <div className="crt-review-card-header">
                    <img src={review.userImage} alt="userImage"/>
                    <span className="crt-review-editable-date" >
                        <RequiredDate control={control} errors={errors} name="date" label="Date of visit" defaultValue={review.date} />
                    </span>
                    <span className="crt-rating" >
                        <RequiredRating control={control} errors={errors} name="rating" label="Rating" defaultValue={review.rating} />
                    </span>
                </div>
                <div className="crt-review-card-content" >
                    <RequiredText control={control} errors={errors} name="comment" label="Review" defaultValue={review.comment} maxLength={4000} />
                </div>
                {review.reply && 
                    <RequiredText control={control} errors={errors} name="replyComment" label="Reply" defaultValue={review.reply.comment} maxLength={4000} />
                }
                <div className="crt-review-card-buttons" >
                    <Button variant="outlined" color="secondary" onClick={onCancel}>Cancel</Button>
                    {!editing && <Button variant="contained" color="secondary" type="submit">Add</Button>}
                    {editing && <Button variant="contained" color="secondary" type="submit">Edit</Button>}
                </div>
            </form>
        </StyledReviewCardEditable>
    )
}

export default ReviewCardEditable;