import { createStore, combineReducers } from "redux";
import appReducer from "./appReducer";
import cardReducer from "./cardReducer";
import modaleReducer from "./modaleReducer";
import moreReducer from "./moreReducer"
import formReducer from "./formReducer";
import registrationReducer from "./registrationReducer";
import { composeWithDevTools } from 'redux-devtools-extension'


const rootReducer = combineReducers({
    app: appReducer,
    card: cardReducer,
    modale: modaleReducer,
    more: moreReducer,
    form: formReducer,
    registration: registrationReducer
})

export const store = createStore(rootReducer, composeWithDevTools());