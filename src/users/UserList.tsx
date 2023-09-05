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
import CreacteAccDialog from './CreacteAccDialog';
import { useSelector, useDispatch } from 'react-redux';
import { addUser, editUser } from '../Actions/Actions';
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
    name: string,
    email: string,
    username: string,
    mobile: string,
    roleKey: string,
    password: string,
) {
    return { name, email, username, mobile, roleKey, password };
}




export default function CustomizedTables() {
    let [userDataEdit, setUserDataEdit] = React.useState({
        name: '',
        email: '',
        username: '',
        mobile: '',
        roleKey: '',
        password: '',
    })
    const dispatch = useDispatch();
    const userDataHere = useSelector((state: any) => state.userReducer)
    let [userData, setUserData] = React.useState([])
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    React.useEffect(() => {
        setUserData(userDataHere)
    }, [userDataHere])

    const rows = userData.map((data: any) => {
        return createData(
            data.name,
            data.email,
            data.username,
            data.mobile,
            data.roleKey,
            '',
        )
    });

    return (
        <>
            <div style={{
                padding: '100px'
            }}>
                <CreacteAccDialog />
                <br />

                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 400 }} aria-label="customized table">
                        <TableHead>
                            <TableRow>
                                <StyledTableCell>Name</StyledTableCell>
                                <StyledTableCell align="center">Email</StyledTableCell>
                                <StyledTableCell align="center">Username</StyledTableCell>
                                <StyledTableCell align="center">Mobile</StyledTableCell>
                                <StyledTableCell align="center">Action</StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows.length>0 ?
                            rows.map((row: any) => (
                                <StyledTableRow key={row.name}>
                                    <StyledTableCell component="th" scope="row">
                                        {row.name}
                                    </StyledTableCell>
                                    <StyledTableCell align="center">{row.email}</StyledTableCell>
                                    <StyledTableCell align="center">{row.username}</StyledTableCell>
                                    <StyledTableCell align="center">{row.mobile}</StyledTableCell>
                                    <StyledTableCell align="center">
                                        <Button onClick={() => {
                                            dispatch(editUser(row))
                                        }}>Edit</Button>
                                        <Button onClick={() => {
                                            setUserDataEdit(row)
                                            handleClickOpen()
                                        }}>Delete</Button>
                                    </StyledTableCell>
                                </StyledTableRow>
                            )):
                            <h3>Please Create New User</h3>
                            }
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
                            <pre> {JSON.stringify(userDataEdit)} </pre>
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose}>Disagree</Button>
                        <Button onClick={() => {
                            let newData = userData.filter((user: any) => {
                                return user.email !== userDataEdit?.email
                            })
                            dispatch(addUser(newData))
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
