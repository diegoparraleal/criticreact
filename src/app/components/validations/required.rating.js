import { Rating } from '@material-ui/lab';
import React from 'react';
import { Controller } from 'react-hook-form';
import ErrorMessage from './error.message';

function RequiredRating({control, errors, defaultValue, name, label}) {
    const rules = { 
        min: { value: 0.5, message:  `${label} is required`} 
    }

    return (
        <>
            <Controller control={control} name={name} defaultValue={defaultValue} 
                rules={rules}
                render={(props) => (
                    <Rating name={name}  precision={0.5}  value={props.value} size="large" onChange={(e, newValue) => props.onChange(newValue)} />
                )} />
            <ErrorMessage errors={errors} name={name}/>   
        </>
    );
}

export default RequiredRating;