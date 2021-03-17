import styled from 'styled-components';
import React from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography } from '@material-ui/core';

const StyledConfirmDialog = styled(Dialog)`
  .MuiDialog-paperWidthSm {
        max-width: 700px;
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