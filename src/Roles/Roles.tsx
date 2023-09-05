import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button } from '@mui/material';
import RoleDialog from './RoleDialog';
import { useSelector, useDispatch } from 'react-redux';
import { addRole, editRole } from '../Actions/Actions';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));


function createData(
    roleName: string,
    roleKey: string,
) {
    return { roleName, roleKey };
}




export default function Roles() {
    let [roleDataEdit, setRoleDataEdit] = React.useState({
        roleName: 'string',
        roleKey: 'string',
    })
    const dispatch = useDispatch();
    const roleDataHere = useSelector((state: any) => state.roleReducer)
    let [roleData, setRoleData] = React.useState([])
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    React.useEffect(() => {
        setRoleData(roleDataHere)
    }, [roleDataHere])

    const rows = roleData.map((data: any) => {
        return createData(
            data.roleName,
            data.roleKey,
        )
    });

    return (
        <>
            <div style={{
                padding: '100px'
            }}>
                <RoleDialog />
                <br />

                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 400 }} aria-label="customized table">
                        <TableHead>
                            <TableRow>
                                <StyledTableCell>Role Name</StyledTableCell>
                                <StyledTableCell align="center">Role Key</StyledTableCell>
                                <StyledTableCell align="center">Action</StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows.length>0 ?
                            rows.map((row: any) => (
                                <StyledTableRow key={row.roleKey}>
                                    <StyledTableCell component="th" scope="row">
                                        {row.roleName}
                                    </StyledTableCell>
                                    <StyledTableCell align="center">{row.roleKey}</StyledTableCell>
                                    <StyledTableCell align="center">
                                        <Button onClick={() => {
                                            dispatch(editRole(row))
                                        }}>Edit</Button>
                                        <Button onClick={() => {
                                            setRoleDataEdit(row)
                                            handleClickOpen()
                                        }}>Delete</Button>
                                    </StyledTableCell>
                                </StyledTableRow>
                            )):
                            <h3>Please Create New Role</h3>}
                        </TableBody>
                    </Table>
                </TableContainer>


                <Dialog
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">
                        {"You Want To Delete This Role ?"}
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            <pre> {JSON.stringify(roleDataEdit)} </pre>
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose}>Disagree</Button>
                        <Button onClick={() => {
                            let newData = roleData.filter((role: any) => {
                                return role.roleKey !== roleDataEdit?.roleKey
                            })
                            dispatch(addRole(newData))
                            handleClose()
                        }} autoFocus>
                            Agree
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        </>
    );
}
