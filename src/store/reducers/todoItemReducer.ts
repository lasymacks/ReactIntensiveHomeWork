import { IAction, ITaskType } from './../../types/todo';
import { ITaskItem, SET_CURRENT_TASK, SET_IS_OPEN } from './../../types/task';

const taskState: ITaskItem = {
    currentTask: {
        id: 0,
        name: '', 
        key: 0, 
        completed: false, 
        chosen: false,
        edit: false,
        date: ''
    }
}

export const TodoItemReducer = (state: ITaskItem = taskState, action: IAction): ITaskItem => {
    switch (action.type) {

        case SET_CURRENT_TASK:
            return {...state, currentTask: action.payload}

        default:
            return state;
    }
}

export const addCurrentTask = (payload: ITaskType) => ({type: SET_CURRENT_TASK, payload});