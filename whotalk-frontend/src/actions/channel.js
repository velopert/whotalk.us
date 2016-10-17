import CHANNEL from './ActionTypes/channel';
import { createAction } from 'redux-actions';
import * as service from 'services/channel';

export const checkValidity = (username) => ({
    type: CHANNEL.CHECK_VALIDITY,
    payload: {
        promise: service.checkValidity(username)
    }
});