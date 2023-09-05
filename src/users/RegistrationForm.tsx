import React, { useEffect, useState } from 'react';
import { addUser } from '../Actions/Actions';
import { useSelector, useDispatch } from 'react-redux'
import {
    TextField,
    Button,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    FormHelperText,
} from '@mui/material';

interface RegistrationFormProps {
    onSubmit: (formData: RegistrationFormData) => void;
}

interface RegistrationFormData {
    name: string,
    email: string,
    username: string,
    mobile: string,
    roleKey: string,
    password: string,
}

const RegistrationForm = ({ handleClose }: any) => {
    const dispatch = useDispatch();
    const userDataHere = useSelector((state: any) => state.userReducer)
    const userDataEdit = useSelector((state: any) => state.editReducer)
    const roleDataHere = useSelector((state: any) => state.roleReducer)
    const [roles, setRoles] = useState([])
    const [formData, setFormData] = useState<RegistrationFormData>({
        name: '',
        email: '',
        username: '',
        mobile: '',
        roleKey: '',
        password: '',
    });
    const [errors, setErrors] = useState<Partial<RegistrationFormData>>({});

    const handleChange = (event: any) => {
        const { name, value } = event.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
    };

    const handleSubmit = (event: any) => {
        event.preventDefault();
        const validationErrors: Partial<RegistrationFormData> = {};

        // Name validation: String only
        if (!formData.name.match(/^[a-zA-Z ]+$/)) {
            validationErrors.name = 'Name should contain only letters and spaces';
        }

        // Email validation: Email pattern and unique email
        if (
            !formData.email.match(
                /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/i
            )
        ) {
            validationErrors.email = 'Invalid email address';
        }

        // roleKey validation: Number only and must be 6 digits
        if (formData.mobile.length < 10 || formData.mobile.length > 10) {
            validationErrors.mobile = 'mobile must be a 10-digit number';
        }

        // roleKey validation: Selection Box
        if (!formData.roleKey) {
            validationErrors.roleKey = 'Please select a roleKey';
        }

        // password validation: Number only and must be 6 digits
        if (formData.password.length < 6) {
            validationErrors.password = 'password must be a 6-digit number';
        }



        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
        } else {
            setErrors({});

            let newData = userDataHere.filter((EditeData: any) => {
                if (userDataEdit) {
                    return EditeData.email !== userDataEdit.email
                } else {
                    return EditeData
                }

            })


            dispatch(addUser(userDataHere.length !== 0 ? [...newData, formData] : [formData]))
            setFormData({
                name: '',
                email: '',
                username: '',
                mobile: '',
                roleKey: '',
                password: '',
            })
            handleClose()

        }
    };

    useEffect(() => {
        if (userDataEdit) {
            setFormData(userDataEdit)
        }
        if(roleDataHere){
            setRoles(roleDataHere)
        }
    }, [userDataEdit,roleDataHere])

    return (
        <div>
            <form onSubmit={handleSubmit} style={{ width: 400 }}>
                <TextField
                    name="name"
                    label="Name"
                    value={formData.name}
                    onChange={handleChange}
                    error={!!errors.name}
                    helperText={errors.name}
                    required
                    fullWidth={true} />
                <br />            <br />
                <TextField
                    name="email"
                    label="Email"
                    value={formData.email}
                    onChange={handleChange}
                    error={!!errors.email}
                    helperText={errors.email}
                    required
                    fullWidth={true} />
                <br />            <br />
                <TextField
                    name="username"
                    label="Username"
                    value={formData.username}
                    onChange={handleChange}
                    error={!!errors.username}
                    helperText={errors.username}
                    required
                    fullWidth={true} />
                <br />            <br />
                <TextField
                    name="mobile"
                    label="Mobile"
                    type='number'
                    value={formData.mobile}
                    onChange={handleChange}
                    error={!!errors.mobile}
                    helperText={errors.mobile}
                    required
                    fullWidth={true} />
                <br />            <br />
                <FormControl error={!!errors.roleKey} fullWidth={true} required >
                    <InputLabel>RoleKey</InputLabel>
                    <Select
                        name="roleKey"
                        label="RoleKey"
                        value={formData.roleKey}
                        fullWidth={true}
                        onChange={(e) => { handleChange(e) }}
                    >
                        {roles?.map((role:any)=>{
                         return <MenuItem key={role.roleKey} value={role.roleName}>{role.roleName}</MenuItem>
                        })}
                    </Select>
                    {errors.roleKey && <FormHelperText>{errors.roleKey}</FormHelperText>}
                </FormControl>
                <br />            <br />
                <TextField
                    name="password"
                    label="password"
                    value={formData.password}
                    onChange={handleChange}
                    error={!!errors.password}
                    helperText={errors.password}
                    required
                    fullWidth={true} />
                <br />            <br />
                <Button type="submit" variant="contained" color="primary" fullWidth={true}>
                    Register
                </Button>
            </form>
        </div>
    );
};

export default RegistrationForm;
