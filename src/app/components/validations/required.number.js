import { FormControl, Input, InputAdornment, InputLabel } from '@material-ui/core';
import React from 'react';
import { Controller } from 'react-hook-form';
import ErrorMessage from './error.message';

function RequiredNumber({control, errors, defaultValue, name, label, adornment}) {
    return (
        <>
            <Controller control={control} name={name} defaultValue={defaultValue} 
                rules={{ required: `${label} is required` }}
                render={(props) => (
                    <FormControl fullWidth>
                        <InputLabel >{label}</InputLabel>
                        <Input value={props.value} onChange={props.onChange} type="number"
                                startAdornment={ adornment != null &&  <InputAdornment position="start">$</InputAdornment>}
                        />
                    </FormControl>
                )} />
            <ErrorMessage errors={errors} name={name}/>   
        </>
    );
}

export default RequiredNumber;