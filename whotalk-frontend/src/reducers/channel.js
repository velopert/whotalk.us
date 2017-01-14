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
        thumbnail: "none",
        talkers: 0,
        following: 0,
        followers: 0,
        isFavorite: false
    },
    focusBox: {
        userList: [],
        isLast: false,
        listIndex: -1
    },
    chat: {
        userList: [],
        identity: null,
        socket: {
            enter: false,
            auth: null,
            username: null,
            controlled: false
        },
        data: [],
        tempDataIndex: [],
        top: true,
        lastInitId: null,
        loadedBetween: false,
        statusMessage: ''
    },
    requests: {
        checkInfo: {
            ...request
        },
        getRecentMsg: {
            ...request
        },
        getMsgBefore: {
            ...request
        },
        getMsgBetween: {
            ...request
        },
        follow: {
            ...request
        },
        followFromUserList: {
            ...request
        },
        unfollow: {
            ...request
        },
        unfollowFromUserList: {
            ...request
        },
        getFollowers: {
            ...request
        },
        getFollowing: {
            ...request
        },
        addFavorite: {
            ...request
        },
        deleteFavorite: {
            ...request
        },
        getStatusMessage: {
            ...request
        }
    }
};

function mapDataToMessages(data) {
    return data.map((message) => {
        return {
            type: message.type,
            payload: {
                anonymous: message.anonymous,
                date: Date.parse(message.date),
                suID: message.suID,
                username: message.username,
                message: message.message
            }
        }
    });
}

function channel(state = initialState, action) {
    const payload = action.payload;
    let messages = null;

    switch (action.type) {

        case CHANNEL.INITIALIZE:
            return {
                ...initialState,
                info: {
                    ...initialState.info,
                    username: payload
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

            /* CHECK_INFO */
        case CHANNEL.CHECK_INFO + '_PENDING':
            return {
                ...state,
                valid: false,
                requests: {
                    ...state.requests,
                    checkInfo: {
                        ...pending
                    }
                }
            };

        case CHANNEL.CHECK_INFO + '_FULFILLED':
            return {
                ...state,
                valid: true,
                info: {
                    ...state.info,
                    ...payload.data.info
                },
                requests: {
                    ...state.requests,
                    checkInfo: {
                        ...fulfilled
                    }
                }
            };

        case CHANNEL.CHECK_INFO + '_REJECTED':
            return {
                ...state,
                valid: false,
                info: {
                    ...initialState.info
                },
                requests: {
                    ...state.requests,
                    checkInfo: {
                        ...rejected,
                        error: payload
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
            if (state.chat.tempDataIndex.length < 1) {
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
            let indexes = null;

            for (let packet of payload) {
                if (packet.type === 'MSG' && packet.payload.username === state.chat.socket.username) {
                    // store tempData if null
                    if (!tempData) 
                        tempData = [...state.chat.data];
                    if (!indexes) 
                        indexes = [...state.chat.tempDataIndex];
                    
                    for (let i = 0; i < indexes.length; i++) {
                        let index = indexes[i];
                        if (tempData[index].payload.uID === packet.payload.uID) {
                            tempData[index] = packet;
                            indexes = [
                                ...indexes.slice(0, i),
                                ...indexes.slice(i + 1, indexes.length)
                            ];
                            console.log(packet, i, index);
                        }
                    }
                }
            }

            if (tempData) {
                // there was some modification
                return {
                    ...state,
                    chat: {
                        ...state.chat,
                        data: tempData,
                        tempDataIndex: indexes
                    }
                };
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
                        ...state.chat.data, {
                            ...payload,
                            temp: true
                        }
                    ],
                    tempDataIndex: [
                        ...state.chat.tempDataIndex,
                        state.chat.data.length
                    ]
                }
            };

        case CHANNEL.MESSAGE_FAILURE:
            // payload: index

            let index = null;
            for (let i = 0; i < state.chat.tempDataIndex.length; i++) {
                if (state.chat.tempDataIndex[i] === payload) {
                    index = i;
                }
            }

            return {
                ...state,
                chat: {
                    ...state.chat,
                    data: [
                        ...state
                            .chat
                            .data
                            .slice(0, payload), {
                            ...state.chat.data[payload],
                            failed: true
                        },
                        ...state
                            .chat
                            .data
                            .slice(payload + 1, state.chat.data.length)
                    ],
                    tempDataIndex: [
                        ...state
                            .chat
                            .tempDataIndex
                            .slice(0, index),
                        ...state
                            .chat
                            .tempDataIndex
                            .slice(index + 1, state.chat.tempDataIndex.length)
                    ]
                }
            }

        case CHANNEL.REMOVE_MESSAGE:
            // payload : index
            return {
                ...state,
                chat: {
                    ...state.chat,
                    data: [
                        ...state
                            .chat
                            .data
                            .slice(0, payload),
                        ...state
                            .chat
                            .data
                            .slice(payload + 1, state.chat.data.length)
                    ]
                }
            };

        case CHANNEL.SET_INITIAL_ONLINE_LIST:
            return {
                ...state,
                chat: {
                    ...state.chat,
                    userList: payload
                }
            };

        case CHANNEL.ADD_ONLINE_USER:
            return {
                ...state,
                chat: {
                    ...state.chat,
                    userList: [
                        ...state.chat.userList,
                        payload
                    ]
                }
            }

        case CHANNEL.REMOVE_ONLINE_USER:
            const removingUserIndex = state.chat.userList.findIndex(user=>user.username===payload);
            return {
                ...state,
                chat: {
                    ...state.chat,
                    userList: [
                        ...state.chat.userList.slice(0, removingUserIndex),
                        ...state.chat.userList.slice(removingUserIndex+1, state.chat.userList.length)
                    ]
                }
            };
        

        /* GET_RECENT_MSG */
        case CHANNEL.GET_RECENT_MSG + '_PENDING':
            return {
                ...state,
                requests: {
                    ...state.requests,
                    getRecentMsg: {
                        ...pending
                    }
                }
            };

        case CHANNEL.GET_RECENT_MSG + '_FULFILLED':
            messages = mapDataToMessages(payload.data.messages);
            if (payload.data.messages.length === 0) {
                return state;
            }
            return {
                ...state,
                chat: {
                    ...state.chat,
                    data: [...messages],
                    top: messages.length < 10,
                    lastInitId: messages[messages.length - 1].payload.suID
                },
                requests: {
                    ...state.requests,
                    getRecentMsg: {
                        ...fulfilled
                    }
                }
            };

        case CHANNEL.GET_RECENT_MSG + '_REJECTED':
            return {
                ...state,
                requests: {
                    ...state.requests,
                    getRecentMsg: {
                        ...rejected,
                        error: payload
                    }
                }
            };

            /* GET_MSG_BEFORE */
        case CHANNEL.GET_MSG_BEFORE + '_PENDING':
            return {
                ...state,
                requests: {
                    ...state.requests,
                    getMsgBefore: {
                        ...pending
                    }
                }
            };

        case CHANNEL.GET_MSG_BEFORE + '_FULFILLED':
            messages = mapDataToMessages(payload.data.messages);

            return {
                ...state,
                chat: {
                    ...state.chat,
                    data: [
                        ...messages,
                        ...state.chat.data
                    ],
                    top: messages.length < 10
                },
                requests: {
                    ...state.requests,
                    getMsgBefore: {
                        ...fulfilled
                    }
                }
            };

        case CHANNEL.GET_MSG_BEFORE + '_REJECTED':
            return {
                ...state,
                requests: {
                    ...state.requests,
                    getMsgBefore: {
                        ...rejected,
                        error: payload
                    }
                }
            };

            /* GET_RECENT_MSG */
        case CHANNEL.GET_MSG_BETWEEN + '_PENDING':
            return {
                ...state,
                chat: {
                    ...state.chat,
                    loadedBetween: true
                },
                requests: {
                    ...state.requests,
                    getMsgBetween: {
                        ...pending
                    }
                }
            };

        case CHANNEL.GET_MSG_BETWEEN + '_FULFILLED':
            messages = mapDataToMessages(payload.data.messages);
            if (payload.data.messages.length === 0) {
                return state;
            }

            return {
                ...state,
                chat: {
                    ...state.chat,
                    data: [
                        ...state.chat.data,
                        ...messages
                    ]
                },
                requests: {
                    ...state.requests,
                    getMsgBetween: {
                        ...fulfilled
                    }
                }
            };

        case CHANNEL.GET_MSG_BETWEEN + '_REJECTED':
            return {
                ...state,
                requests: {
                    ...state.requests,
                    getMsgBetween: {
                        ...rejected,
                        error: payload
                    }
                }
            };

        case CHANNEL.FOLLOW + '_PENDING':
            return {
                ...state,
                requests: {
                    ...state.requests,
                    follow: {
                        ...pending
                    }
                }
            };

        case CHANNEL.FOLLOW + '_FULFILLED':
            return {
                ...state,
                info: {
                    ...state.info,
                    followers: payload.data.count,
                    followed: true
                },
                requests: {
                    ...state.requests,
                    follow: {
                        ...fulfilled
                    }
                }
            }

        case CHANNEL.FOLLOW + '_REJECTED':
            return {
                ...state,
                requests: {
                    ...state.requests,
                    follow: {
                        ...rejected,
                        error: payload
                    }
                }
            };

        case CHANNEL.UNFOLLOW + '_PENDING':
            return {
                ...state,
                requests: {
                    ...state.requests,
                    unfollow: {
                        ...pending
                    }
                }
            };

        case CHANNEL.UNFOLLOW + '_FULFILLED':
            return {
                ...state,
                info: {
                    ...state.info,
                    followers: payload.data.count,
                    followed: false
                },
                requests: {
                    ...state.requests,
                    unfollow: {
                        ...fulfilled
                    }
                }
            };

        case CHANNEL.UNFOLLOW + '_REJECTED':
            return {
                ...state,
                requests: {
                    ...state.requests,
                    unfollow: {
                        ...rejected,
                        error: payload
                    }
                }
            };

        case CHANNEL.GET_FOLLOWERS + '_PENDING':
            return {
                ...state,
                focusBox: {
                    ...state.focusBox,
                    isLast: false
                },
                requests: {
                    ...state.requests,
                    getFollowers: {
                        ...pending
                    }
                }
            }

        case CHANNEL.GET_FOLLOWERS + '_FULFILLED':
            return {
                ...state,
                focusBox: {
                    isLast: payload.data.followers.length < 10, // 20 으로 나중에 바꾸자
                    userList: state.focusBox.userList.length === 0 ? payload.data.followers :
                    [ ...state.focusBox.userList, ...payload.data.followers]
                },
                requests: {
                    ...state.requests,
                    getFollowers: {
                        ...fulfilled
                    }
                }
            }

        case CHANNEL.GET_FOLLOWERS + '_REJECTED':
            return {
                ...state,
                requests: {
                    ...state.requests,
                    getFollowers: {
                        ...rejected,
                        error: payload
                    }
                }
            }

        case CHANNEL.GET_FOLLOWING + '_PENDING':
            return {
                ...state,
                focusBox: {
                    ...state.focusBox,
                    isLast: false
                },
                requests: {
                    ...state.requests,
                    getFollowing: {
                        ...pending
                    }
                }
            }

        case CHANNEL.GET_FOLLOWING + '_FULFILLED':
            return {
                ...state,
                focusBox: {
                    isLast: payload.data.following.length < 10, // 20 으로 나중에 바꾸자
                    userList: state.focusBox.userList.length === 0 ? payload.data.following :
                    [ ...state.focusBox.userList, ...payload.data.following]
                },
                requests: {
                    ...state.requests,
                    getFollowing: {
                        ...fulfilled
                    }
                }
            }

        case CHANNEL.GET_FOLLOWING + '_REJECTED':
            return {
                ...state,
                requests: {
                    ...state.requests,
                    getFollowing: {
                        ...rejected,
                        error: payload
                    }
                }
            }


        case CHANNEL.CLEAR_USER_LIST: 
            return {
                ...state,
                focusBox: {
                    ...state.focusBox,
                    userList: []
                }
            };

        case CHANNEL.SET_USER_LIST_INDEX:
            return {
                ...state,
                focusBox: {
                    ...state.focusBox,
                    listIndex: payload
                }
            };


        case CHANNEL.FOLLOW_FROM_USER_LIST + "_PENDING":
            return {
                ...state,
                requests: {
                    ...state.requests,
                    followFromUserList: {
                        ...pending
                    }
                }
            }

        case CHANNEL.FOLLOW_FROM_USER_LIST + "_FULFILLED":            
            return {
                ...state,
                requests: {
                    ...state.requests,
                    followFromUserList: {
                        ...fulfilled
                    }
                }
            }

        case CHANNEL.FOLLOW_FROM_USER_LIST + "_REJECTED":
            return {
                ...state,
                requests: {
                    ...state.requests,
                    followFromUserList: {
                        ...rejected,
                        error: payload
                    }
                }
            }

        case CHANNEL.UNFOLLOW_FROM_USER_LIST + "_PENDING":
            return {
                ...state,
                requests: {
                    ...state.requests,
                    unfollowFromUserList: {
                        ...pending
                    }
                }
            }

        case CHANNEL.UNFOLLOW_FROM_USER_LIST + "_FULFILLED":            
            return {
                ...state,
                requests: {
                    ...state.requests,
                    unfollowFromUserList: {
                        ...fulfilled
                    }
                }
            }

        case CHANNEL.UNFOLLOW_FROM_USER_LIST + "_REJECTED":
            return {
                ...state,
                requests: {
                    ...state.requests,
                    unfollowFromUserList: {
                        ...rejected,
                        error: payload
                    }
                }
            }

        case CHANNEL.TOGGLE_USER_INFO_FOLLOW_BUTTON:

            var userList = state.focusBox.userList;

            return {
                ...state,
                focusBox: {
                    ...state.focusBox,
                    userList: [
                        ...userList.slice(0, payload),
                        { ...userList[payload], disabled: !(userList[payload].disabled), following: userList[payload].disabled ? !(userList[payload].following) : userList[payload].following},
                        ...userList.slice(payload + 1, userList.length)
                    ]
                }

            }

        case CHANNEL.ADD_FAVORITE + "_PENDING":
            return {
                ...state,
                requests: {
                    ...state.requests,
                    addFavorite: {
                        ...pending
                    }
                }
            }

        case CHANNEL.ADD_FAVORITE + "_FULFILLED":            
            return {
                ...state,
                info: {
                    ...state.info,
                    isFavorite: !state.info.isFavorite
                },
                requests: {
                    ...state.requests,
                    addFavorite: {
                        ...fulfilled
                    }
                }
            }

        case CHANNEL.ADD_FAVORITE + "_REJECTED":
            return {
                ...state,
                requests: {
                    ...state.requests,
                    addFavorite: {
                        ...rejected,
                        error: payload
                    }
                }
            }

        case CHANNEL.DELETE_FAVORITE + "_PENDING":
            return {
                ...state,
                requests: {
                    ...state.requests,
                    deleteFavorite: {
                        ...pending
                    }
                }
            }

        case CHANNEL.DELETE_FAVORITE + "_FULFILLED":            
            return {
                ...state,
                info: {
                    ...state.info,
                    isFavorite: !state.info.isFavorite
                },
                requests: {
                    ...state.requests,
                    deleteFavorite: {
                        ...fulfilled
                    }
                }
            }

        case CHANNEL.DELETE_FAVORITE + "_REJECTED":
            return {
                ...state,
                requests: {
                    ...state.requests,
                    deleteFavorite: {
                        ...rejected,
                        error: payload
                    }
                }
            }

        case CHANNEL.GET_STATUS_MSG + "_PENDING":
            return {
                ...state,
                requests: {
                    ...state.requests,
                    getStatusMessage: {
                        ...pending
                    }
                }
            }

        case CHANNEL.GET_STATUS_MSG + "_FULFILLED":            
            return {
                ...state,
                chat: {
                    ...state.chat,
                    statusMessage: action.payload.data.message
                },
                requests: {
                    ...state.requests,
                    getStatusMessage: {
                        ...fulfilled
                    }
                }
            }

        case CHANNEL.GET_STATUS_MSG + "_REJECTED":
            return {
                ...state,
                requests: {
                    ...state.requests,
                    getStatusMessage: {
                        ...rejected,
                        error: payload
                    }
                }
            }

        

        default:
            return state;
    }
}

export default channel;