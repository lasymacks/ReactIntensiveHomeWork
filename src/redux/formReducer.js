const fromState = {
    inputValue: '',
    textareaValue: '',
    errors: '',
}

const formReducer = (state = fromState, action) => {
    switch (action.type) {

        case 'SET_INPUT_VALUE':
            return {...state, inputValue: action.payload}

        case 'SET_TEXTAREA_VALUE':
            return {...state, textareaValue: action.payload}   
            
        case 'SET_ERRORS':
            return {...state, errors: action.payload}

        default:
            return state;
    }
}

export default formReducer;