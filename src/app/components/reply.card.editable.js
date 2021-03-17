import { Button, TextField } from '@material-ui/core';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import styled from 'styled-components';
import ErrorMessage from './validations/error.message';

const StyledReplyCardEditable = styled.div`
  .crt-review-reply-editable{
    .crt-review-reply-comment {
      display: block;
    }
  }
  .crt-review-card-buttons{
    text-align: right;
    margin-top: 16px;
    button{
      margin-left: 16px;
    }
  }
`;


function ReplyCardEditable({reply, onReply}) {
    const {control, handleSubmit, errors} = useForm()
    
    const postReply = ({comment}) => onReply({...reply, comment})
    
    return (
        <StyledReplyCardEditable>
            <form onSubmit={handleSubmit(postReply)}>
                <div className="crt-review-reply-editable" >
                    <Controller control={control} name="comment" defaultValue={reply?.comment} 
                                rules={{ required: "The reply is required" }}
                                render={(props) => (
                                    <TextField  multiline className="crt-review-reply-comment" value={props.value} fullWidth={true}
                                                label="Please add a reply" onChange={props.onChange} inputProps={{ maxLength: 4000 }} />
                                )} />
                    <ErrorMessage errors={errors} name="comment"/>
                </div>
                <div className="crt-review-card-buttons" >
                    <Button variant="outlined" color="secondary" type="submit">Reply</Button>
                </div>
            </form>
        </StyledReplyCardEditable>
    );
}

export default ReplyCardEditable;