import UI from './ActionTypes/ui';
import { createAction } from 'redux-actions';

export const toggleSidebar = createAction(UI.TOGGLE_SIDEBAR);
export const setHeaderTransparency = createAction(UI.SET_HEADER_TRANSPARENCY);