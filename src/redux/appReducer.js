const appState = {
    bascet: {
      bascet: null,
      sum: null,
      goods: []
    },
    role: 'visitor',
    modale: false,
    modaleBascet: false,
    registrationModale: false,
    users : [],
    newUsers: [{
      username: 'admin',
        password: 'admin',
        name: {
            firstname: 'admin'
        },
        error: ''
    }]
  };
  
const appReducer = (state = appState, action) => {
  switch (action.type) {

    case "SET_BASCET":
      return {...state, bascet: action.payload}

    case "SET_ROLE":
      return {...state, role: action.payload}

    case "SET_MODALE":
      return {...state, modale: action.payload}

    case "SET_MODALE_BASCET":
      return {...state, modaleBascet: action.payload}

    case "SET_USERS":
      return {...state, users: action.payload}

    case "SET_NEW_USERS":
      return {...state, newUsers: action.payload}

    case "SET_REGISTRATION_MODALE":
      return {...state, registrationModale: action.payload}

    default:
      return state;
  }
}

export default appReducer;