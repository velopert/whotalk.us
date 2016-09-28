import { createRequestTypes } from 'utils';


/* AUTHENTICATION */

export const CHECK_USERNAME_EXISTS_REQ = createRequestTypes('CHECK_USERNAME_EXISTS');

export const LOCAL_REGISTER_FIRST_STEP = 'LOCAL_REGISTER_FIRST_STEP';
export const LOCAL_REGISTER_REQ = createRequestTypes('LOCAL_REGISTER_REQ');

export const LOCAL_LOGIN_REQ = createRequestTypes('LOCAL_LOGIN_REQ');

export const OAUTH_CHECK_REQ = createRequestTypes('OAUTH_CHECK_REQ');
export const OAUTH_REGISTER_REQ = createRequestTypes('OAUTH_REGISTER_REQ')

// This will be removed when server side rendering gets implemented
export const CHECK_SESSION_REQ = createRequestTypes('CHECK_SESSION_REQ');
