import CHANNEL from 'actions/ActionTypes/channel';

const request = {
    fetching: false,
    fetched: false,
    error: null
}

const pending = {
    fetching: true,
    fetched: false,
    error: null
};
const fulfilled = {
    fetching: false,
    fetched: true,
    error: null
};
const rejected = {
    fetching: false,
    fetched: false
}

const initialState = {
    valid: false,
    info: {
        username: null,
        familyName: null,
        givenName: null,
        thumbnail: "none"
    },
    chat: {
        identity: null
    },
    requests: {
        checkValidity: {
            ...request
        }
    }
};

function channel(state = initialState, action) {
    const payload = action.payload;

    switch (action.type) {

        case CHANNEL.INITIALIZE:
            return {
                ...initialState,
                info: {
                    ...initialState.info,
                    username: payload,
                }
            };

        case CHANNEL.SET_IDENTITY: 
            return {
                ...state,
                chat: {
                    ...state.chat,
                    identity: payload
                }
            };

        /* CHECK_VALIDITY */
        case CHANNEL.CHECK_VALIDITY + '_PENDING':
            return {
                ...state,
                valid: false,
                requests: {
                    ...state.requests,
                    checkValidity: {
                        ...pending
                    }
                }
            };

        case CHANNEL.CHECK_VALIDITY + '_FULFILLED':
            return {
                ...state,
                valid: true,
                info: { ... state.info, ...payload.data.info },
                requests: {
                    ...state.requests,
                    checkValidity: {
                        ...fulfilled
                    }
                }
            };
        
        case CHANNEL.CHECK_VALIDITY + '_REJECTED':
            return {
                ...state,
                valid: false,
                info: {...initialState.info},
                requests: {
                    ...state.requests,
                    checkValidity: {
                        ...rejected, error: payload 
                    }
                }
            };

        default:
            return state;
    }
}

export default channel;