
const initialState = [];
const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case "userData":
            return state = action.data;

        default:
            return state;
    }
}
export default userReducer;