import { PopupReducer } from './reducers/popupReducer';
import { TodoReducer } from './reducers/todoReducer';
import { applyMiddleware, combineReducers, createStore } from "redux";
import thunk from "redux-thunk";
import { TodoItemReducer } from './reducers/todoItemReducer';

const rootReducer = combineReducers({
    todo: TodoReducer,
    todoItem: TodoItemReducer,
    popup: PopupReducer
})

export const store = createStore(rootReducer, applyMiddleware(thunk));

export type RootState = ReturnType<typeof rootReducer>