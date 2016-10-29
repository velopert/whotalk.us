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