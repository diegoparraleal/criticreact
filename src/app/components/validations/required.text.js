import { TextField } from '@material-ui/core';
import React from 'react';
import { Controller } from 'react-hook-form';
import ErrorMessage from './error.message';

function RequiredText({control, errors, defaultValue, name, label, maxLength, pattern = null, patternMessage = ""}) {
    const rules = { 
        required: `${label} is required`,
        pattern: pattern ? { value: pattern, message: patternMessage} : undefined
    }

    return (
        <>
            <Controller control={control} name={name} defaultValue={defaultValue} 
                rules={rules}
                render={(props) => (
                    <TextField fullWidth multiline name={name} value={props.value} 
                                label={label} onChange={props.onChange} inputProps={{ maxLength: {maxLength} }} />
                )} />
            <ErrorMessage errors={errors} name={name}/>   
        </>
    );
}

export default RequiredText;