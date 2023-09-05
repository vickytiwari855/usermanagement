
const initialState = null;
const editRoleReducer = (state = initialState, action) => {
    switch (action.type) {
        case "editRoleData":
            return state = action.data;

        default:
            return state;
    }
}
export default editRoleReducer;