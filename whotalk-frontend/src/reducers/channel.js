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
    requests: {
        checkValidity: {
            ...request
        }
    }
};

function channel(state = initialState, action) {
    const payload = action.payload;

    switch (action.type) {
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
                valid: payload.data.valid,
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