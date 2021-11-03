export enum TodoActionTypes {
    FETCH_TASKS = "FETCH_TASKS",
    FETCH_IS_LOADED = "FETCH_IS_LOADED",
    SET_TASKS = "SET_TASKS",
    SET_INPUT = "SET_INPUT",
    SET_COUNT = "SET_COUNT",
    SET_ERROR = "SET_ERROR",
    SET_COMPLETED = "SET_COMPLETED",
    SET_IN_WORK = "SET_IN_WORK",
    SET_CHOSEN = "SET_CHOSEN"
}

export interface ITaskType {
    id: number,
    name: string, 
    key: number, 
    completed: boolean, 
    chosen:boolean,
    edit: boolean,
    date: string
}

export interface ITodoState {
    tasks: ITaskType[],
    isLoaded: boolean,
    input: string,
    error: string,
    completed: boolean,
    inWork: boolean,
    chosen: boolean
}

export interface IAction {
    type: string,
    payload?: any
}