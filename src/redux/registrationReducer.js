const registrationState = {
    registration: {
        username: '',
        password: '',
        name: {
            firstname: ''
        },
        error: ''
    }

}

const registrationReducer = (state = registrationState, action) => {
    switch (action.type) {
        case 'SET_REGISTRATION':
            return { ...state, registration: action.payload }

        default:
            return state;
    }
 
}

export default registrationReducer;