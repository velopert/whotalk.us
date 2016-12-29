import UI from 'actions/ActionTypes/ui';

const initialState = {
    selectLanguage: {
        visible: false
    },
    userSearch : {
        show: false
    },
    sidebar: {
        show: false
    },
    header: {
        transparent: true
    },
    home: {
        like: true
    },
    explore: {
        preAnimate: false
    },
    footer: {
        space: false,
        show: true
    },
    channel: {
        box: {
            state: 'default'
        },
        chat: {
            started: false,
            selecting: false,
            closing: false,
            onlineList: false,
            statusMessage: false
        },
    },
    focusBox: {
        show: false,
        closing: false,
        type: null
    },
    clientSize: {
        height: null,
        width: null
    },

    myPage: {
        menuIndex: 0,
        account: {
            editPassword: false
        }
    }
};

function ui(state=initialState, action) {
    const payload = action.payload;

    switch (action.type) {
        case UI.INITIALIZE:
            return {
                ...state,
                [payload]: {
                    ...initialState[payload]
                }
            };
        case UI.TOGGLE_SIDEBAR:
            return {
                ...state,
                sidebar: {
                    ...state.sidebar,
                    show: !state.sidebar.show
                }
            };
        case UI.SET_HEADER_TRANSPARENCY:
            return {
                ...state,
                header: {
                    transparent: payload
                }
            };
        case UI.SET_LIKE_TRANSPARENCY:
            return {
                ...state,
                home: {
                    like: payload
                }
            };
        case UI.SET_FOOTER_SPACE:
            return {
                ...state,
                footer: {
                    ...state.footer,
                    space: payload
                }
            };
        case UI.SET_FOOTER_VISIBILITY:
            return {
                ...state,
                footer : {
                    ...state.footer,
                    show: payload
                }
            };
        case UI.SET_CHANNELBOX_STATE:
            return {
                ...state,
                channel: {
                    ...state.channel,
                    box: {
                        ...state.channel.box,
                        state: payload
                    }
                }
            }
        case UI.SET_CHANNELCHAT_STATE:
            return {
                ...state,
                channel: {
                    ...state.channel,
                    chat: {
                        ...state.channel.chat,
                        ...payload
                    }
                }
            }
        case UI.UPDATE_CLIENT_SIZE:
            return {
                ...state,
                clientSize: {
                    height: payload.height,
                    width: payload.width
                }
            };

        case UI.TOGGLE_FOCUS_BOX: 
            return {
                ...state,
                focusBox: {
                    ...state.focusBox,
                    show: !state.focusBox.show,
                    type: state.focusBox.show ? null : state.focusBox.type,
                    closing: false
                }
            }

        case UI.SHOW_FOCUS_BOX:
            return {
                ...state,
                focusBox: {
                    ...state.focusBox,
                    type: payload
                }
            };

        case UI.CLOSING_FOCUS_BOX:
            return {
                ...state,
                focusBox: {
                    ...state.focusBox,
                    closing: true
                }
            }

        case UI.OPEN_EXPLORE:
            return {
                ...state,
                explore: {
                    ...state.explore,
                    preAnimate: true
                }
            }
        
        case UI.USER_SEARCH_TOGGLE: 
            return {
                ...state,
                userSearch: {
                    ...state.userSearch,
                    show: !state.userSearch.show
                }
            }
        
        case UI.SELECT_LANGUAGE_TOGGLE:
            return {
                ...state,
                selectLanguage: {
                    ...state.selectLanguage,
                    visible: !state.selectLanguage.visible
                }
            };

        case UI.EDIT_PASSWORD_VISIBILITY_SET:
            return {
                ...state,
                myPage: {
                    ...state.myPage,
                    account: {
                        ...state.account,
                        editPassword: payload
                    }
                }
            };

        default: 
            return state;
    }
}

export default ui;