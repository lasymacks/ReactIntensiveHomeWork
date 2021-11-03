import { ITodoState, IAction, TodoActionTypes, ITaskType } from './../../types/todo';


const todoState: ITodoState = {
    tasks: [],
    isLoaded: false,
    input: '',
    error: '',
    completed: false,
    inWork: false,
    chosen: false
}

export const TodoReducer = (state:ITodoState = todoState, action:IAction):ITodoState => {
    switch (action.type) {
        case TodoActionTypes.FETCH_TASKS:
            return {...state, tasks: action.payload};

        case TodoActionTypes.FETCH_IS_LOADED:
            return {...state, isLoaded: action.payload};

        case TodoActionTypes.SET_TASKS:
            return {...state, tasks: action.payload};

        case TodoActionTypes.SET_INPUT:
            return {...state, input: action.payload};

        case TodoActionTypes.SET_ERROR:
            return {...state, error: action.payload};

        case TodoActionTypes.SET_COMPLETED:
            return {...state, completed: action.payload};

        case TodoActionTypes.SET_IN_WORK:
            return {...state, inWork: action.payload};

        case TodoActionTypes.SET_CHOSEN:
            return {...state, chosen: action.payload};

        default:
            return state;
    }
}

export const addFetchTasks = (payload: object[]) => ({type: TodoActionTypes.FETCH_TASKS, payload});
export const addFetchLoaded = (payload: boolean) => ({type: TodoActionTypes.FETCH_IS_LOADED, payload});
export const addFetchError = (payload: string) => ({type: TodoActionTypes.SET_ERROR, payload});
export const addTasks = (payload: object[]) => ({type: TodoActionTypes.SET_TASKS, payload});
export const addInput = (payload: string) => ({type: TodoActionTypes.SET_INPUT, payload});
export const addInWork = (payload: boolean) => ({type: TodoActionTypes.SET_IN_WORK, payload});
export const addChosen = (payload: boolean) => ({type: TodoActionTypes.SET_CHOSEN, payload});
export const addCompleted = (payload: boolean) => ({type: TodoActionTypes.SET_COMPLETED, payload});