import styled from 'styled-components';
import React from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography } from '@material-ui/core';
import RequiredNumber from './validations/required.number';
import RequiredText from './validations/required.text';
import RequiredGoogleAutocomplete from './validations/required.google.autocomplete';
import { useForm } from 'react-hook-form';

const StyledConfirmDialog = styled(Dialog)`
    .MuiDialog-paperWidthSm {
        max-width: 700px;
    }

    .crt-dialog-content {
        width: 640px;

        > div {
            width: 100%;
            margin-bottom: 16px;
        }
    }

    .crt-title{
        text-transform: uppercase;
    }

    .crt-error {
        margin-top: -14px
    }
`;


function ConfirmDialog({title, message, onCancel, onConfirm}) {

    return (
        <StyledConfirmDialog open={true} onClose={onCancel} aria-labelledby="form-dialog-title">
                <DialogTitle>
                    <Typography color="primary" className="crt-title">{title}</Typography>
                </DialogTitle>
                <DialogContent className="crt-dialog-content">
                    <Typography color="primary" className="crt-content">{message}</Typography>
                </DialogContent>
                <DialogActions>
                    <Button variant="outlined" onClick={onCancel} color="primary">
                        Cancel
                    </Button>
                    <Button variant="contained" onClick={onConfirm} color="secondary">
                        OK
                    </Button>
                </DialogActions>
        </StyledConfirmDialog>
    );
}

export default ConfirmDialog;