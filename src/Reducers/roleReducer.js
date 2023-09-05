
const initialState = [];
const roleReducer = (state = initialState, action) => {
    switch (action.type) {
        case "roleData":
            return state = action.data;

        default:
            return state;
    }
}
export default roleReducer;