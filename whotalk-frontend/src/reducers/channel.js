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
        identity: null,
        socket: {
            enter: null,
            auth: null,
            username: null
        },
        data: [],
        tempData: []
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

        case CHANNEL.SET_SOCKET_STATE:
            return {
                ...state,
                chat: {
                    ...state.chat,
                    socket: {
                        ...state.chat.socket,
                        ...payload
                    }
                }
            }

        case CHANNEL.RECEIVE_REALTIME_DATA:
            if(payload.type !== 'MSG' ||
                state.chat.tempData.length === 0 ||
                payload.payload.username !== state.chat.socket.username) {
                    
                    return {
                        ...state,
                        chat: {
                            ...state.chat,
                            data: [
                                ...state.chat.data,
                                payload
                            ]
                        }
                    };
                } else {
                    const index = state.chat.tempData.findIndex(
                        packet => packet.payload.uID === payload.payload.uID
                    );

                    if(index===-1) {
                        // not found
                        return {
                            ...state,
                            chat: {
                                ...state.chat,
                                data: [
                                    ...state.chat.data,
                                    payload
                                ]
                            }
                        };
                    }
                    
                    // found
                    return {
                        ...state,
                        chat: {
                            ...state.chat,
                            data: [
                                ...state.chat.data,
                                payload
                            ],
                            tempData: [
                                ...state.chat.tempData.slice(0, index),
                                ...state.chat.tempData.slice(index+1, state.chat.tempData.length-1)
                            ]
                        }
                    };
                }


        case CHANNEL.WRITE_MESSAGE: 
            return {
                ...state,
                chat: {
                    ...state.chat,
                    tempData: [
                        ...state.chat.tempData,
                        payload
                    ]
                }
            };
        default:
            return state;
    }
}

export default channel;