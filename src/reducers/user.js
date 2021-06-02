const initialState = {
    newMedicineTaken: ""
};

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case "SET_USER_DATA": 
            return {
                ...state,
                ...action.payload
            }
        // Used for triggering a re-render and letting other components subscribe to that event (e.g. IntakesProgress) to update the UI
        case "TAKE_NEW_MEDICINE":
            return {
                ...state,
                newMedicineTaken: action.payload
            }
        default:
            return state;
    }
}

export default userReducer;