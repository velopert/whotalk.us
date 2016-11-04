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
            username: null,
            controlled: false
        },
        data: [],
        tempDataIndex: [],
        tempDataCount: 0
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
            // if there is no tempDataIndex, just return the data + payload array
            if(state.chat.tempDataIndex.length < 1) {
                return {
                    ...state,
                    chat: {
                        ...state.chat,
                        data: [
                            ...state.chat.data,
                            ...payload
                        ]
                    }
                };
            }

            let tempData = null;
            let found = 0;
            for(let packet of payload) {
                if(packet.type === 'MSG' && packet.payload.username === state.chat.socket.username) {
                    // store tempData if null
                    if(!tempData) tempData = [...state.chat.data];

                    for(let index of state.chat.tempDataIndex) {
                        if(!tempData[index]) continue;
                        // if uID matches
                        if(tempData[index].payload.uID === packet.payload.uID) {
                            // replace the message
                            tempData[index] = packet;
                            found++;
                            console.log(tempData[index].payload);
                        }
                    }
                }
            }

            console.log(state.chat.tempDataCount, found);

            if(tempData) {
                // there was some modification
                return {
                    ...state,
                    chat: {
                        ...state.chat,
                        data: tempData,
                        tempDataIndex: (state.chat.tempDataCount - found === 0) ? [] :state.chat.tempDataIndex,
                        tempDataCount: state.chat.tempDataCount - found
                    }
                }
            } else {
                return {
                    ...state,
                    chat: {
                        ...state.chat,
                        data: [
                            ...state.chat.data,
                            ...payload
                        ]
                    }
                };
            }

        case CHANNEL.WRITE_MESSAGE: 
            return {
                ...state,
                chat: {
                    ...state.chat,
                    data: [
                        ...state.chat.data,
                        {
                            ...payload,
                            temp: true
                        }
                    ],
                    tempDataIndex: [
                        ...state.chat.tempDataIndex,
                        state.chat.data.length
                    ],
                    tempDataCount: state.chat.tempDataCount + 1
                }
            };

        case CHANNEL.MESSAGE_FAILURE:
            // payload: index
            return {
                ...state,
                chat: {
                    ...state.chat,
                    data: [
                        ...state.chat.data.slice(0, payload),
                        {...state.chat.data[payload], failed: true },
                        ...state.chat.data.slice(payload+1, state.chat.data.length)
                    ]
                }
            }

        case CHANNEL.REMOVE_MESSAGE:
            // payload : index

            let index = null;
            for(let i = 0 ; i < state.chat.tempDataIndex.length; i++) {
                if(state.chat.tempDataIndex[i] === payload) {
                    index = i;
                }
            }

            return {
                ...state,
                chat: {
                    ...state.chat,
                    data: [
                        ...state.chat.data.slice(0, payload),
                        ...state.chat.data.slice(payload+1, state.chat.data.length)
                    ],
                    tempDataIndex: [
                        ...state.chat.tempDataIndex.slice(0, index),
                        ...state.chat.tempDataIndex.slice(index+1, state.chat.tempDataIndex.length)
                    ],
                    tempDataCount: state.chat.tempDataCount -1
                }
            };
            
        default:
            return state;
    }
}

export default channel;