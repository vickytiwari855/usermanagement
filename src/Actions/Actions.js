export const addUser = (data) => {
    return {
        type: 'userData',
        data: data
    }
}

export const editUser = (data) => {
    return {
        type: 'editData',
        data: data
    }
}



export const addRole = (data) => {
    return {
        type: 'roleData',
        data: data
    }
}

export const editRole = (data) => {
    return {
        type: 'editRoleData',
        data: data
    }
}