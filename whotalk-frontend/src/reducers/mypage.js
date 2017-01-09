import { createAction, handleActions } from 'redux-actions';
import * as service from 'services/mypage';
import * as rs from 'helpers/requestStatus';

/* Actions */

const INITIALIZE = "mypage/INITIALIZE";


const INITIAL_SETTING_GET = "mypage/INITIAL_SETTING_GET";
const INITIAL_SETTING_GET_PENDING = "mypage/INITIAL_SETTING_GET_PENDING";
const INITIAL_SETTING_GET_FULFILLED = "mypage/INITIAL_SETTING_GET_FULFILLED";
const INITIAL_SETTING_GET_REJECTED = "mypage/INITIAL_SETTING_GET_REJECTED";

const ACCOUNT_SETTING_UPDATE = "mypage/ACCOUNT_SETTING_UPDATE";
const ACCOUNT_SETTING_UPDATE_PENDING = "mypage/ACCOUNT_SETTING_UPDATE_PENDING";
const ACCOUNT_SETTING_UPDATE_FULFILLED = "mypage/ACCOUNT_SETTING_UPDATE_FULFILLED";
const ACCOUNT_SETTING_UPDATE_REJECTED = "mypage/ACCOUNT_SETTING_UPDATE_REJECTED";


const CHANNEL_SETTING_UPDATE = "mypage/CHANNEL_SETTING_UPDATE";
const CHANNEL_SETTING_UPDATE_PENDING = "mypage/CHANNEL_SETTING_UPDATE_PENDING";
const CHANNEL_SETTING_UPDATE_FULFILLED = "mypage/CHANNEL_SETTING_UPDATE_FULFILLED";
const CHANNEL_SETTING_UPDATE_REJECTED = "mypage/CHANNEL_SETTING_UPDATE_REJECTED";


const MESSAGE_CLEAR = "mypage/MESSAGE_CLEAR";
const MESSAGE_CLEAR_PENDING = "mypage/MESSAGE_CLEAR_PENDING";
const MESSAGE_CLEAR_FULFILLED = "mypage/MESSAGE_CLEAR_FULFILLED";
const MESSAGE_CLEAR_REJECTED = "mypage/MESSAGE_CLEAR_REJECTED";

const UNREGISTER = "mypage/UNREGISTER";
const UNREGISTER_PENDING = "mypage/UNREGISTER_PENDING";
const UNREGISTER_FULFILLED = "mypage/UNREGISTER_FULFILLED";
const UNREGISTER_REJECTED = "mypage/UNREGISTER_REJECTED";


const SETTING_TYPE_SET = "mypage/SETTING_TYPE_SET";
const CONFIRM_CLEAR_VISIBILITY_SET = "mypage/CONFIRM_CLEAR_VISIBILITY_SET";
const UNREGISTER_VISIBILITY_SET = "mypage/UNREGISTER_VISIBILITY_SET";

const EDIT_THUMBNAIL_VISIBILITY_SET = "mypage/EDIT_THUMBNAIL_VISIBILITY_SET";
const FILE_SET = "mypage/FILE_SET";
const IMAGE_STORE = "mypage/IMAGE_STORE";


/* Action Creators */

export const initialize = createAction(INITIALIZE);

export const getInitialSetting = () => ({
    type: INITIAL_SETTING_GET,
    payload: {
        promise: service.getInitialSetting()
    }
});

export const setSettingType = createAction(SETTING_TYPE_SET);

export const updateAccountSetting = (data) => ({
    type: ACCOUNT_SETTING_UPDATE,
    payload: {
        promise: service.updateAccountSetting(data)
    }
});

export const updateChannelSetting = (data) => ({
    type: CHANNEL_SETTING_UPDATE,
    payload: {
        promise: service.updateChannelSetting(data)
    }
});

export const clearMessage = () => ({
    type: MESSAGE_CLEAR,
    payload: {
        promise: service.clearMessage()
    }
});

export const unregister = () => ({
    type: UNREGISTER,
    payload: {
        promise: service.unregister()
    }
});

export const setConfirmClearVisibility = createAction(CONFIRM_CLEAR_VISIBILITY_SET);
export const setUnregisterVisibility = createAction(UNREGISTER_VISIBILITY_SET);
export const setEditThumbnailVisibility = createAction(EDIT_THUMBNAIL_VISIBILITY_SET);
export const setFile = createAction(FILE_SET);
export const storeImage = createAction(IMAGE_STORE);

/* Initial State */
const initialState = {
    type: 'account',
    account: {
        username: '',
        familyName: '',
        givenName: '',
        email: '',
        type: ''
    },
    channel: {
        statusMessage: ''
    },
    file: null,
    image: null,
    confirmClearVisibility: false,
    unregisterVisibility: false,
    editThumbnailVisibility: false,
    requests: {
        getInitialSetting: {
            ...rs.request
        },
        updateAccountSetting: {
            ...rs.request
        },
        updateChannelSetting: {
            ...rs.request
        },
        clearMessage: {
            ...rs.request
        },
        unregister: {
            ...rs.request
        }
    }
}

/* Reducers */
export default handleActions({
    [INITIALIZE]: (state, action) => initialState,

    /* INITIAL_SETTING_GET */

    [INITIAL_SETTING_GET_PENDING]: (state, action) => ({
        ...state,
        requests: {
            ...state.requests,
            getInitialSetting: {
                ...rs.pending
            }
        }
    }),

    [INITIAL_SETTING_GET_FULFILLED]: (state, action) => ({
        ...state,
        account: action.payload.data.account,
        channel: action.payload.data.channel,
        requests: {
            ...state.requests,
            getInitialSetting: {
                ...rs.fulfilled
            }
        }
    }),

    [INITIAL_SETTING_GET_REJECTED]: (state, action) => ({
        ...state,
        account: initialState.account,
        channel: initialState.channel,
        requests: {
            ...state.requests,
            getInitialSetting: {
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
    }),

    /* CHANNEL_SETTING_UPDATE */

    [CHANNEL_SETTING_UPDATE_PENDING]: (state, action) => ({
        ...state,
        requests: {
            ...state.requests,
            updateChannelSetting: {
                ...rs.pending
            }
        }
    }),

    [CHANNEL_SETTING_UPDATE_FULFILLED]: (state, action) => ({
        ...state,
        requests: {
            ...state.requests,
            updateChannelSetting: {
                ...rs.fulfilled
            }
        }
    }),

    [CHANNEL_SETTING_UPDATE_REJECTED]: (state, action) => ({
        ...state,
        requests: {
            ...state.requests,
            updateChannelSetting: {
                ...rs.rejected,
                error: action.payload
            }
        }
    }),


    /* MESSAGE_CLEAR */

    [MESSAGE_CLEAR_PENDING]: (state, action) => ({
        ...state,
        requests: {
            ...state.requests,
            clearMessage: {
                ...rs.pending
            }
        }
    }),

    [MESSAGE_CLEAR_FULFILLED]: (state, action) => ({
        ...state,
        requests: {
            ...state.requests,
            clearMessage: {
                ...rs.fulfilled
            }
        }
    }),

    [MESSAGE_CLEAR_REJECTED]: (state, action) => ({
        ...state,
        requests: {
            ...state.requests,
            clearMessage: {
                ...rs.rejected,
                error: action.payload
            }
        }
    }),

    /* UNREGISTER */

    [UNREGISTER_PENDING]: (state, action) => ({
        ...state,
        requests: {
            ...state.requests,
            unregister: {
                ...rs.pending
            }
        }
    }),

    [UNREGISTER_FULFILLED]: (state, action) => ({
        ...state,
        requests: {
            ...state.requests,
            unregister: {
                ...rs.fulfilled
            }
        }
    }),

    [UNREGISTER_REJECTED]: (state, action) => ({
        ...state,
        requests: {
            ...state.requests,
            unregister: {
                ...rs.rejected,
                error: action.payload
            }
        }
    }),



    [SETTING_TYPE_SET]: (state,action) => ({
        ...state,
        type: action.payload
    }),

    [CONFIRM_CLEAR_VISIBILITY_SET]: (state, action) => ({
        ...state,
        confirmClearVisibility: action.payload
    }),

    [UNREGISTER_VISIBILITY_SET]: (state, action) => ({
        ...state,
        unregisterVisibility: action.payload
    }),

    [EDIT_THUMBNAIL_VISIBILITY_SET]: (state, action) => ({
        ...state,
        editThumbnailVisibility: action.payload
    }),

    [FILE_SET]: (state, action) => ({
        ...state,
        file: action.payload
    }),

    [IMAGE_STORE]: (state, action) => ({
        ...state,
        image: action.payload
    })

}, initialState);