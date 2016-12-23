import COMMON from './ActionTypes/common';
import { createAction } from 'redux-actions';
import * as service from 'services/common';

export const initializeSearch = createAction(COMMON.SEARCH_INITIALIZE);

export const getSearchUser = (username) => ({
    type: COMMON.SEARCH_USER_GET,
    payload: {
        promise: service.getSearchUser(username)
    }
});