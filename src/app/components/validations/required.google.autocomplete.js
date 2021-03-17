import { FormControl, TextField, InputLabel } from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import React from 'react';
import { Controller } from 'react-hook-form';
import usePlacesAutocomplete, { getGeocode, getLatLng } from 'use-places-autocomplete';
import ErrorMessage from './error.message';

function RequiredGoogleAutocomplete({control, errors, defaultValue, name, label, options, maxLength}) {
    const {suggestions: { data }, setValue, clearSuggestions} = usePlacesAutocomplete({ requestOptions: options, debounce: 300})
    const handleInput = (e, onChange) => {
        setValue(e.target.value)
        onChange(e.target.value)
    }
    return (
        <>
            <Controller control={control} name={name} defaultValue={defaultValue} 
                rules={{ required: `${label} is required` }}
                render={(props) => (
                    <FormControl fullWidth>
                        <Autocomplete freeSolo id="free-solo-2-demo"
                            value={props.value}
                            options={data.map(({structured_formatting: { main_text }}) => main_text)}
                            renderInput={(params) => (
                                <TextField {...params} InputProps={{ ...params.InputProps, type: 'search', maxLength: maxLength }} 
                                           fullWidth name={name} label={label}  onChange={(e) => handleInput(e, props.onChange)} />
                            )}
                        />
                    </FormControl>
                )} />
            <ErrorMessage errors={errors} name={name} />   
        </>
    );
}

export default RequiredGoogleAutocomplete;
