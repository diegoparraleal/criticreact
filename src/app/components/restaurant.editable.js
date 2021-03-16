import styled from 'styled-components';
import React from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Typography } from '@material-ui/core';
import { Controller, useForm } from 'react-hook-form';
import ErrorMessage from './error.message';

const StyledRestaurantEditableDialog = styled(Dialog)`
    .MuiDialog-paperWidthSm {
        max-width: 700px;
    }

    .crt-dialog-content {
        width: 640px;

        > div {
            width: 100%;
            margin-bottom: 16px;

            .MuiFormControl-root{
                width: 100%;
            }
        }
    }

    .crt-title{
        text-transform: uppercase;
    }
`;


function RestaurantEditable({restaurant, title, confirmButton, onCancel, onConfirm}) {
    const {handleSubmit, errors, control} = useForm()

    const confirm = (data) => {
        console.log(data)
    }

    return (
        <StyledRestaurantEditableDialog open={true} onClose={onCancel} aria-labelledby="form-dialog-title" className="crt-dialog">
            <form onSubmit={handleSubmit(confirm)}>
                <DialogTitle>
                    <Typography color="primary" className="crt-title">{title}</Typography>
                </DialogTitle>
                <DialogContent className="crt-dialog-content">
                    <div>
                        <Controller control={control} name="name" defaultValue={restaurant.name} 
                                    rules={{ required: "The name is required" }}
                                        render={(props) => (
                                            <TextField  multiline name="name" value={props.value} 
                                                        label="Please add a name" onChange={props.onChange} inputProps={{ maxLength: 200 }} />
                                        )} />
                        <ErrorMessage errors={errors} name="name"/>
                    </div>
                    <div>
                        <Controller control={control} name="description" defaultValue={restaurant.name} 
                                    rules={{ required: "The description is required" }}
                                        render={(props) => (
                                            <TextField  multiline name="description" value={props.value} 
                                                        label="Please add a description" onChange={props.onChange} inputProps={{ maxLength: 4000 }} />
                                        )} />
                        <ErrorMessage errors={errors} name="description"/>
                    </div>
                    <div>
                        <Controller control={control} name="city" defaultValue={restaurant.name} 
                                    rules={{ required: "The city is required" }}
                                        render={(props) => (
                                            <TextField  multiline name="city" value={props.value} 
                                                        label="Please add a city" onChange={props.onChange} inputProps={{ maxLength: 4000 }} />
                                        )} />
                        <ErrorMessage errors={errors} name="city"/>
                    </div>
                    <div>
                        <Controller control={control} name="address" defaultValue={restaurant.name} 
                                    rules={{ required: "The address is required" }}
                                        render={(props) => (
                                            <TextField  multiline name="address" value={props.value} 
                                                        label="Please add a address" onChange={props.onChange} inputProps={{ maxLength: 4000 }} />
                                        )} />
                        <ErrorMessage errors={errors} name="address"/>
                    </div>
                    <div>
                        <Controller control={control} name="prices" defaultValue={restaurant.name} 
                                    rules={{ required: "The prices is required" }}
                                        render={(props) => (
                                            <TextField  multiline name="prices" value={props.value} 
                                                        label="Please add a prices" onChange={props.onChange} inputProps={{ maxLength: 4000 }} />
                                        )} />
                        <ErrorMessage errors={errors} name="prices"/>
                    </div>
                    <div>
                        <Controller control={control} name="image" defaultValue={restaurant.name} 
                                    rules={{ required: "The image is required" }}
                                        render={(props) => (
                                            <TextField  multiline name="image" value={props.value} 
                                                        label="Please add a image" onChange={props.onChange} inputProps={{ maxLength: 4000 }} />
                                        )} />
                        <ErrorMessage errors={errors} name="image"/>
                    </div>
                </DialogContent>
                <DialogActions>
                    <Button variant="outlined" onClick={onCancel} color="primary">
                        Cancel
                    </Button>
                    <Button variant="contained" type="submit" color="secondary">
                        {confirmButton}
                    </Button>
                </DialogActions>
            </form>
        </StyledRestaurantEditableDialog>
    );
}

export default RestaurantEditable;