import { IAction } from './../../types/todo';
import { IPopupState, SET_POPUP_OPEN } from './../../types/popup';

const popupState: IPopupState = {
    isOpen: false
}

export const PopupReducer = (state: IPopupState = popupState, action: IAction):IPopupState => {
    switch (action.type) {
        case SET_POPUP_OPEN:
            return {...state, isOpen: action.payload};

        default:
            return state;
    }
}

export const addPopupOpen = (payload: boolean) => ({type: SET_POPUP_OPEN, payload});