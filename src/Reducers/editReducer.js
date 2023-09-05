
const initialState = null;
const editReducer = (state = initialState, action) => {
    switch (action.type) {
        case "editData":
            return state = action.data;

        default:
            return state;
    }
}
export default editReducer;