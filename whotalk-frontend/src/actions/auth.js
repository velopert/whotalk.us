import AUTH from './ActionTypes/auth';
import { createAction } from 'redux-actions';
import * as service from 'services/auth';

export const checkUsername = (username) => (dispatch) => {
    return dispatch({
        type: AUTH.CHECK_USERNAME,
        payload: {
            promise: service.checkUsername(username)
        }
    })
};

export const localRegisterPrior = createAction(AUTH.LOCAL_REGISTER_PRIOR);
