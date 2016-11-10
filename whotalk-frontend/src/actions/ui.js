import UI from './ActionTypes/ui';
import { createAction } from 'redux-actions';

export const initialize = createAction(UI.INITIALIZE);
export const toggleSidebar = createAction(UI.TOGGLE_SIDEBAR);
export const setHeaderTransparency = createAction(UI.SET_HEADER_TRANSPARENCY);
export const setLikeTransparency = createAction(UI.SET_LIKE_TRANSPARENCY);

export const setFooterSpace = createAction(UI.SET_FOOTER_SPACE);
export const setFooterVisibility = createAction(UI.SET_FOOTER_VISIBILITY);

export const setChannelBoxState = createAction(UI.SET_CHANNELBOX_STATE);
export const setChannelChatState = createAction(UI.SET_CHANNELCHAT_STATE);

export const updateClientHeight = createAction(UI.UPDATE_CLIENT_HEIGHT);

// manages the Dimmed component
export const toggleFocusBox = createAction(UI.TOGGLE_FOCUS_BOX);

// actually opens the focusbox
export const showFocusBox = createAction(UI.SHOW_FOCUS_BOX);