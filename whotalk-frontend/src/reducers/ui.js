import UI from 'actions/ActionTypes/ui';

const initialState = {
    sidebar: {
        show: false
    },
    header: {
        transparent: true
    },
    home: {
        like: true
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
            closing: false
        },
    },
    focusBox: {
        show: false,
        type: null
    },
    clientHeight: null
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
        case UI.UPDATE_CLIENT_HEIGHT:
            return {
                ...state,
                clientHeight: payload
            };

        case UI.TOGGLE_FOCUS_BOX: 
            return {
                ...state,
                focusBox: {
                    ...state.focusBox,
                    show: !state.focusBox.show,
                    type: state.focusBox.show ? null : state.focusBox.type
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

        default: 
            return state;
    }
}

export default ui;