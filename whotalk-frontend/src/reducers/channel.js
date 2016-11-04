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
                        // if uID matches
                        if(tempData[index].payload.uID === packet.payload.uID) {
                            // replace the message
                            tempData[index] = packet;
                            found++;
                        }
                    }
                }
            }

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





            // if(payload.type === 'MSG' && 
            //    state.chat.tempDataIndex.length > 0 &&
            //    payload.payload.username === state.chat.socket.username) {

            //        // find the realtime data in current data, by checking tempDataIndex

            //        let dataIndex = -1;
            //        for(let i = 0; i < state.chat.tempDataIndex.length; i++) {
            //            // for every temp data index
            //            dataIndex = state.chat.tempDataIndex[i];
            //            if(state.chat.data[dataIndex].payload.uID === payload.payload.uID) {
            //                // if uID matches, replace the message
            //                // and remove the index from tempDataIndex
            //                const tempData = [...state.chat.data];
            //                tempData[dataIndex] = payload;
                           
            //                // clear the tempDataIndex when tempDataCount is 0
            //                const clear = state.chat.tempDataCount === 1 ? [] : state.chat.tempDataIndex;

            //                return {
            //                    ...state,
            //                    chat : {
            //                        ...state.chat,
            //                        data: tempData,
            //                        tempDataIndex: clear,
            //                        tempDataCount: state.chat.tempDataCount - 1
            //                    }
            //                };
            //            }
            //        }
            // }

            return {
                ...state,
                chat : {
                    ...state.chat,
                    data: [
                        ...state.chat.data,
                        ...payload
                    ]
                }
            };
            // if(payload.type !== 'MSG' ||
            //     state.chat.tempDataIndex.length === 0 ||
            //     payload.payload.username !== state.chat.socket.username) {
            //         // not MSG, no tempDataIndex, not own packet
            //         return {
            //             ...state,
            //             chat: {
            //                 ...state.chat,
            //                 data: [
            //                     ...state.chat.data,
            //                     payload
            //                 ]
            //             }
            //         };
            // } else {
            //     return state;
                // there is tempDataIndex, and this packet is own MSG
                // const copy = [ ...state.chat.data ];

                // state.chat.tempDataIndex.forEach(
                //     i => {
                //         if(copy[i].payload.uID === payload.payload.uID) {
                //             copy[i].temp = false;
                //             copy[i].suID = payload.payload.suID;
                //             console.log('found"payload);
                //         }
                //     }
                // );

                // return {
                //     ...state,
                //     chat: {
                //         ...state.chat ,
                //         data: copy
                //     }
                // }
            //}


            // if(payload.type !== 'MSG' ||
            //     state.chat.tempDataIndex.length === 0 ||
            //     payload.payload.username !== state.chat.socket.username) {
                    
            //         return {
            //             ...state,
            //             chat: {
            //                 ...state.chat,
            //                 data: [
            //                     ...state.chat.data,
            //                     payload
            //                 ]
            //             }
            //         };
            //     } else {
            //         const index = state.chat.tempDataIndex.findIndex(
            //             packet => packet.payload.uID === payload.payload.uID
            //         );

            //         if(index===-1) {
            //             // not found
            //             return {
            //                 ...state,
            //                 chat: {
            //                     ...state.chat,
            //                     data: [
            //                         ...state.chat.data,
            //                         payload
            //                     ]
            //                 }
            //             };
            //         }
                    
            //         // found
            //         return {
            //             ...state,
            //             chat: {
            //                 ...state.chat,
            //                 data: [
            //                     ...state.chat.data,
            //                     payload
            //                 ],
            //                 tempDataIndex: [
            //                     ...state.chat.tempDataIndex.slice(0, index),
            //                     ...state.chat.tempDataIndex.slice(index+1, state.chat.tempDataIndex.length-1)
            //                 ]
            //             }
            //         };
            //     }

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
        default:
            return state;
    }
}

export default channel;