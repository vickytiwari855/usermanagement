import React, { useEffect, useState } from 'react';
import { addRole } from '../Actions/Actions';
import { useSelector, useDispatch } from 'react-redux'
import {
    TextField,
    Button,
} from '@mui/material';

interface RoleFormProps {
    onSubmit: (formData: RoleFormData) => void;
}

interface RoleFormData {
    roleName: string,
    roleKey: string,
}

const RoleForm = ({ handleClose }: any) => {
    const dispatch = useDispatch();
    const roleDataHere = useSelector((state: any) => state.roleReducer)
    const roleDataEdit = useSelector((state: any) => state.editRoleReducer)

    const [formData, setFormData] = useState<RoleFormData>({
        roleName: '',
        roleKey: '',
    });
    const [errors, setErrors] = useState<Partial<RoleFormData>>({});

    const handleChange = (event: any) => {
        const { name, value } = event.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
    };

    const handleSubmit = (event: any) => {
        event.preventDefault();
        const validationErrors: Partial<RoleFormData> = {};

        // roleKey validation: Selection Box
        if (!formData.roleKey) {
            validationErrors.roleKey = 'Please enter a roleKey';
        }

          // roleKey validation: Selection Box
          if (!formData.roleName) {
            validationErrors.roleName = 'Please enter a roleName';
        }




        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
        } else {
            setErrors({});

            let newData = roleDataHere.filter((EditeData: any) => {
                if(roleDataEdit){
                    return EditeData.roleKey !== roleDataEdit.roleKey
                }else{
                    return EditeData
                }
                
            })


            dispatch(addRole(roleDataHere.length !== 0 ? [...newData, formData] : [formData]))
            setFormData({
                roleName: '',
                roleKey: '',
            })
            handleClose()
            
        }
    };

    useEffect(() => {
        if (roleDataEdit) {
            setFormData(roleDataEdit)
        }
    }, [roleDataEdit])


    return (
        <div>
            <form onSubmit={handleSubmit} style={{ width: 400 }}>
                <TextField
                    name="roleName"
                    label="Role Name"
                    value={formData.roleName}
                    onChange={handleChange}
                    error={!!errors.roleName}
                    helperText={errors.roleName}
                    required
                    fullWidth={true} />
                <br />            <br />
                <TextField
                    name="roleKey"
                    label="Role Key"
                    value={formData.roleKey}
                    onChange={handleChange}
                    error={!!errors.roleKey}
                    helperText={errors.roleKey}
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

export default RoleForm;
