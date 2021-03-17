import { Button, Dialog, DialogActions, DialogContent, DialogTitle, MenuItem, Typography } from '@material-ui/core';
import React from 'react';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import RequiredSelect from './validations/required.select';
import RequiredText from './validations/required.text';
const StyledUserEditableDialog = styled(Dialog)`
    .MuiDialog-paperWidthSm {
        max-width: 700px;
    }
`;

function UserEditable({user, onCancel, onEdit}) {
    const {handleSubmit, errors, control} = useForm()
    const emailPattern = /^\S+@\S+\.\S+$/
    const confirm = ({name, email, role}) => {
        onEdit({...user, name, email, role})
    }
    return (
        <StyledUserEditableDialog open={true} onClose={onCancel} aria-labelledby="form-dialog-title" className="crt-dialog">
            <form onSubmit={handleSubmit(confirm)}>
                <DialogTitle>
                    <Typography color="primary" className="crt-title">Edit User</Typography>
                </DialogTitle>
                <DialogContent className="crt-dialog-content">
                    <RequiredText control={control} errors={errors} name="name" label="Name" defaultValue={user.name} maxLength={200} />
                    <RequiredText control={control} errors={errors} name="email" label="Email" defaultValue={user.email} maxLength={100} 
                                  pattern={emailPattern} patternMessage="Please enter a valid email address"/>
                    <RequiredSelect control={control} errors={errors} name="role" label="Role" defaultValue={user.role}>
                        <MenuItem value="user">User</MenuItem>
                        <MenuItem value="owner">Owner</MenuItem>
                        <MenuItem value="admin">Admin</MenuItem>
                    </RequiredSelect>
                </DialogContent>
                <DialogActions>
                    <Button variant="outlined" onClick={onCancel} color="primary">Cancel</Button>
                    <Button variant="contained" type="submit" color="secondary">Edit</Button>
                </DialogActions>
            </form>
        </StyledUserEditableDialog>
    );
}

export default UserEditable;    