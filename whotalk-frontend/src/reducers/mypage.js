import { createAction, handleActions } from 'redux-actions';
import * as service from 'services/mypage';
import * as rs from 'helpers/requestStatus';

/* Actions */

const INITIALIZE = "mypage/INITIALIZE";


const ACCOUNT_SETTING_GET = "mypage/ACCOUNT_SETTING_GET";
const ACCOUNT_SETTING_GET_PENDING = "mypage/ACCOUNT_SETTING_GET_PENDING";
const ACCOUNT_SETTING_GET_FULFILLED = "mypage/ACCOUNT_SETTING_GET_FULFILLED";
const ACCOUNT_SETTING_GET_REJECTED = "mypage/ACCOUNT_SETTING_GET_REJECTED";

const ACCOUNT_SETTING_UPDATE = "mypage/ACCOUNT_SETTING_UPDATE";
const ACCOUNT_SETTING_UPDATE_PENDING = "mypage/ACCOUNT_SETTING_UPDATE_PENDING";
const ACCOUNT_SETTING_UPDATE_FULFILLED = "mypage/ACCOUNT_SETTING_UPDATE_FULFILLED";
const ACCOUNT_SETTING_UPDATE_REJECTED = "mypage/ACCOUNT_SETTING_UPDATE_REJECTED";


/* Action Creators */

export const initialize = createAction(INITIALIZE);

export const getAccountSetting = () => ({
    type: ACCOUNT_SETTING_GET,
    payload: {
        promise: service.getAccountSetting()
    }
});

export const updateAccountSetting = (data) => ({
    type: ACCOUNT_SETTING_UPDATE,
    payload: {
        promise: service.updateAccountSetting(data)
    }
});



/* Initial State */
const initialState = {
    account: {
        username: '',
        familyName: '',
        givenName: '',
        email: '',
        type: ''
    },
    requests: {
        getAccountSetting: {
            ...rs.request
        },
        updateAccountSetting: {
            ...rs.request
        }
    }
}

/* Reducers */
export default handleActions({
    [INITIALIZE]: (state, action) => initialState,

    /* ACCOUNT_SETTING_GET */

    [ACCOUNT_SETTING_GET_PENDING]: (state, action) => ({
        ...state,
        requests: {
            ...state.requests,
            getAccountSetting: {
                ...rs.pending
            }
        }
    }),

    [ACCOUNT_SETTING_GET_FULFILLED]: (state, action) => ({
        ...state,
        account: action.payload.data.account,
        requests: {
            ...state.requests,
            getAccountSetting: {
                ...rs.fulfilled
            }
        }
    }),

    [ACCOUNT_SETTING_GET_REJECTED]: (state, action) => ({
        ...state,
        account: initialState.account,
        requests: {
            ...state.requests,
            getAccountSEtting: {
                ...rs.rejected,
                error: action.payload
            }
        }
    }),

    /* ACCOUNT_SETTING_UPDATE */

    [ACCOUNT_SETTING_UPDATE_PENDING]: (state, action) => ({
        ...state,
        requests: {
            ...state.requests,
            updateAccountSetting: {
                ...rs.pending
            }
        }
    }),

    [ACCOUNT_SETTING_UPDATE_FULFILLED]: (state, action) => ({
        ...state,
        requests: {
            ...state.requests,
            updateAccountSetting: {
                ...rs.fulfilled
            }
        }
    }),

    [ACCOUNT_SETTING_UPDATE_REJECTED]: (state, action) => ({
        ...state,
        requests: {
            ...state.requests,
            updateAccountSetting: {
                ...rs.rejected,
                error: action.payload
            }
        }
    })

}, initialState);