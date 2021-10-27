const modaleState = {
    authorization: {
        login: '',
        password: '',
        formErrors: '',
        loginValid: '',
        passwordValid: '',
        formValid: '',
        currentError: ''
    }
}

const modaleReducer = (state = modaleState, action) => {
    switch (action.type) {
        case 'SET_AUTHORIZATION':
            return { ...state, authorization: action.payload }

        default:
            return state;
    }
}

export default modaleReducer;