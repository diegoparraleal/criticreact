import styled from 'styled-components';
import React from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography } from '@material-ui/core';
import RequiredNumber from './validations/required.number';
import RequiredText from './validations/required.text';
import RequiredGoogleAutocomplete from './validations/required.google.autocomplete';
import { useForm } from 'react-hook-form';

const StyledRestaurantEditableDialog = styled(Dialog)`
  .MuiDialog-paperWidthSm {
        max-width: 700px;
  }
`;

const newRestaurant = {
    name: "",
    description: "",
    city: "",
    address: "",
    price: 0,
    image: ""
}

function RestaurantEditable({restaurant = newRestaurant, title, confirmButton, onCancel, onConfirm}) {
    const {handleSubmit, errors, control} = useForm()
    const confirm = ({name, description, city, address, price, image}) => onConfirm({...restaurant, name, description, city, address, price, image})
    const imageUrlRegex = /^(https?:\/\/?.*)|(data:image\/jpeg.*)/i;

    return (
        <StyledRestaurantEditableDialog open={true} onClose={onCancel} aria-labelledby="form-dialog-title" className="crt-dialog">
            <form onSubmit={handleSubmit(confirm)}>
                <DialogTitle>
                    <Typography color="primary" className="crt-title">{title}</Typography>
                </DialogTitle>
                <DialogContent className="crt-dialog-content">
                    <RequiredText control={control} errors={errors} name="name" label="Name" defaultValue={restaurant.name} maxLength={200} />
                    <RequiredText control={control} errors={errors} name="description" label="Description" defaultValue={restaurant.description} maxLength={4000} />
                    <RequiredGoogleAutocomplete control={control} errors={errors} name="city" label="City" defaultValue={restaurant.city} maxLength={100}
                                                options={{types: ['(cities)']}} />
                    <RequiredGoogleAutocomplete control={control} errors={errors} name="address" label="Address" defaultValue={restaurant.address} maxLength={4000} 
                                                options={{}} />
                    <RequiredNumber control={control} errors={errors} name="price" label="Average Price" defaultValue={restaurant.price} adornment="$" />
                    <RequiredText control={control} errors={errors} name="image" label="Image url" defaultValue={restaurant.image} maxLength={4000} 
                                  pattern={imageUrlRegex} patternMessage="Please enter a valid url address"/>
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