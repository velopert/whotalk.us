import { createRequestTypes } from 'utils';


/* AUTHENTICATION */

export CHECK_USERNAME_EXISTS_REQ = createRequestTypes('CHECK_USERNAME_EXISTS');

export LOCAL_REGISTER_FIRST_STEP = 'LOCAL_REGISTER_FIRST_STEP';
export LOCAL_REGISTER_REQ = createRequestTypes('LOCAL_REGISTER_REQ');

export LOCAL_LOGIN_REQ = createRequestTypes('LOCAL_LOGIN_REQ');

export OAUTH_CHECK_REQ = createRequestTypes('OAUTH_CHECK_REQ');
export OAUTH_REGISTER_REQ = createRequestTypes('OAUTH_REGISTER_REQ')

// This will be removed when server side rendering gets implemented
export CHECK_SESSION_REQ createRequestTypes('CHECK_SESSION_REQ');
