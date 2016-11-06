import CHANNEL from './ActionTypes/channel';
import { createAction } from 'redux-actions';
import * as service from 'services/channel';


export const initialize = createAction(CHANNEL.INITIALIZE);
export const setIdentity = createAction(CHANNEL.SET_IDENTITY);
export const checkValidity = (username) => ({
    type: CHANNEL.CHECK_VALIDITY,
    payload: {
        promise: service.checkValidity(username)
    }
});

export const setSocketState = createAction(CHANNEL.SET_SOCKET_STATE);

export const receiveRealtimeData = createAction(CHANNEL.RECEIVE_REALTIME_DATA);
export const writeMessage = createAction(CHANNEL.WRITE_MESSAGE);
export const messageFailure = createAction(CHANNEL.MESSAGE_FAILURE);
export const removeMessage = createAction(CHANNEL.REMOVE_MESSAGE);

export const getRecentMsg = (username) => ({
    type: CHANNEL.GET_RECENT_MSG,
    payload: {
        promise: service.getRecentMsg(username)
    }
});

export const getMsgBefore = ({username, cursorId}) => ({
    type: CHANNEL.GET_MSG_BEFORE,
    payload: {
        promise: service.getMsgBefore(username, cursorId)
    }
});

export const getMsgBetween = ({username, startId, endId}) => ({
    type: CHANNEL.GET_MSG_BETWEEN,
    payload: {
        promise: service.getMsgBetween(username, startId, endId)
    }
});