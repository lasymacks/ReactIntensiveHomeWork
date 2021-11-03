import { ITaskType } from './todo';

export const SET_CURRENT_TASK = "SET_CURRENT_TASK";
export const SET_IS_OPEN = "SET_IS_OPEN";

export interface ITaskItem {
    currentTask: ITaskType
}