import * as ActionTypes from './ActionTypes';
import { createAction } from 'redux-actions';
import * as service from 'services/auth';

export const checkUsername = (username) => ({
    type: ActionTypes.CHECK_USERNAME,
    payload: {
        promise: service.checkUsername(username)
    }
});

export const localRegisterPrior = createAction(ActionTypes.LOCAL_REGISTER_PRIOR);
