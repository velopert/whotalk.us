import AUTH from './ActionTypes/auth';
import { createAction } from 'redux-actions';
import * as service from 'services/auth';

export const checkUsername = (username) => ({
    type: AUTH.CHECK_USERNAME,
    payload: {
        promise: service.checkUsername(username)
    }
});

export const checkEmail = (email) => ({
    type: AUTH.CHECK_EMAIL,
    payload: {
        promise: service.checkEmail(email)
    }
});

export const localRegisterPrior = createAction(AUTH.LOCAL_REGISTER_PRIOR);


export const resetRegisterStatus = createAction(AUTH.RESET_REGISTER_STATUS);