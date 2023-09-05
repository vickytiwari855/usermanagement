import * as React from 'react';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import IconButton from '@mui/material/IconButton';
import { Close } from '@mui/icons-material';
import RoleForm from './RoleForm';
import { useSelector, useDispatch } from 'react-redux'
import { editRole } from '../Actions/Actions';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

export default function RoleDialog() {
  const [open, setOpen] = React.useState(false);
  const roleDataEdit = useSelector((state: any) => state.editRoleReducer)
  const dispatch = useDispatch();

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
    dispatch(editRole(null))

  };

  React.useEffect(() => {
    if (roleDataEdit) {
      handleClickOpen()
    }
  }, [roleDataEdit])

  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        New Role
      </Button>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          New Role
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <Close />
        </IconButton>
        <DialogContent dividers>
          <RoleForm handleClose={handleClose}/>
        </DialogContent>
      </BootstrapDialog>
    </div>
  );
}
