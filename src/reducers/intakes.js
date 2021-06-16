const initialState = {
    pressedIntake: "",
    editedIntake: "", 
    intakesForToday: []
}

const intakesReducer = (state = initialState, action) => {
    switch (action.type) {
        case "PRESS_ON_INTAKE":
            return {
                ...state,
                pressedIntake: action.payload
            }
        case "EDIT_INTAKE":
            return {
                ...state,
                editedIntake: action.payload
            }
        case "SET_INTAKES_FOR_TODAY":
            return {
                ...state,
                intakesForToday: action.payload
            }
        default:
            return state
    }
}

export default intakesReducer