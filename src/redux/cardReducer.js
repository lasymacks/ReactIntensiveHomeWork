const cardState = {
    error: null,
    isLoaded: false,
    card: [],
    id: ''
}

const cardReducer = (state = cardState, action) => {
    switch (action.type) {
        case 'SET_ERROR':
          return {...state, error: action.payload}

        case 'SET_ISLOADED':
            return {...state, isLoaded: action.payload}

        case 'SET_CARD':
            return {...state, card: action.payload}

        case "SET_ID":
            return {...state, id: action.payload}

      default:
        return state;
    }
}

export default cardReducer;