import { createAction, handleActions } from 'redux-actions';
import * as service from 'services/mypage';

/* Actions */

const INITIALIZE = "mypage/INITIALIZE";
const ACCOUNT_SETTING_GET = "mypage/ACCOUNT_SETTING_GET";


/* Action Creators */

export const initialize = createAction(INITIALIZE);

export const getAccountSetting = () => ({
    type: ACCOUNT_SETTING_GET,
    payload: {
        promise: service.getAccountSettings
    }
});

/* Initial State */
const initialState = {
    account: {
        username: null,
        familyName: null,
        givenName: null,
        email: null
    }
}

/* Reducers */


