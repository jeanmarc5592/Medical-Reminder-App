const initialState = {
    pressedIntake: ""
}

const intakesReducer = (state = initialState, action) => {
    switch (action.type) {
        case "PRESS_ON_INTAKE":
            return {
                ...state,
                pressedIntake: action.payload
            }
        default:
            return state
    }
}

export default intakesReducer