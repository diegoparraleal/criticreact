import { KeyboardDatePicker } from '@material-ui/pickers';
import { datePickerDefaultProps } from '@material-ui/pickers/constants/prop-types';
import React from 'react';
import { Controller } from 'react-hook-form';
import ErrorMessage from './error.message';

function RequiredDate({control, errors, defaultValue, name, label}) {
    const rules = { 
        required: `${label} is required`,
    }

    return (
        <>
            <Controller control={control} name={name} defaultValue={defaultValue} 
                rules={rules}
                render={(props) => (
                    <KeyboardDatePicker defaultValue={datePickerDefaultProps}  disableToolbar variant="inline" format="MM/dd/yyyy" margin="normal"  
                                        label={label} name={name} value={props.value} onChange={props.onChange} />
                )} />
            <ErrorMessage errors={errors} name={name}/>   
        </>
    );
}

export default RequiredDate;