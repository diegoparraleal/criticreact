import {ErrorMessage as HookFormErrorMessage} from '@hookform/error-message';
import React from 'react';

function ErrorMessage({errors, name}) {
    return (
        <HookFormErrorMessage errors={errors} name={name} render={({ message }) => <span className="crt-error">{message}</span>}/>
    );
}

export default ErrorMessage;