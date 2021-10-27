const moreState = {
    error: null,
    isLoaded: false,
    cards: {},
    count: 0,
    edit: false,
}

const cardReducer = (state = moreState, action) => {
    switch (action.type) {

        case 'SET_ERROR':
            return {...state, error: action.payload}

        case 'SET_IS_LOADED':
            return {...state, isLoaded: action.payload}   
            
        case 'SET_CARDS':
            return {...state, cards: action.payload}

        case 'SET_COUNT':
            return {...state, count: action.payload}

        case 'SET_EDIT':
            return {...state, edit: action.payload}

        default:
            return state;
    }
}

export default cardReducer;