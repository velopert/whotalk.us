import * as ActionTypes from './ActionTypes';
import { createAction } from 'redux-actions';


export const checkUsernameExists = createAction(ActionTypes.CHECK_SESSION_REQ.INIT);

export const localRegisterFirstStep = createAction(ActionTypes.LOCAL_REGISTER_FIRST_STEP);
export const localRegister = createAction(ActionTypes.LOCAL_REGISTER_REQ.INIT);

export const localLogin = createAction(ActionTypes.LOCAL_LOGIN_REQ)