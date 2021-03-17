import { Select, TextField } from '@material-ui/core';
import React from 'react';
import { Controller } from 'react-hook-form';
import ErrorMessage from './error.message';

function RequiredSelect({control, errors, defaultValue, name, label, children}) {
    const rules = { 
        required: `${label} is required`
    }

    return (
        <>
            <Controller control={control} name={name} defaultValue={defaultValue} 
                rules={rules}
                render={(props) => (
                    <Select value={props.value} onChange={props.onChange} displayEmpty>
                        {children}
                    </Select>
                )} />
            <ErrorMessage errors={errors} name={name}/>   
        </>
    );
}

export default RequiredSelect;