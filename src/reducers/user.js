const initialState = {};

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case "SET_USER_DATA": 
            return {
                ...state,
                ...action.payload
            }
        default:
            return state;
    }
}

export default userReducer;