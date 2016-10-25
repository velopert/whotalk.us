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
        }
    }
};

function ui(state=initialState, action) {
    const payload = action.payload;

    switch (action.type) {
        case UI.INITIALIZE:
            return {
                ...state,
                ...initialState[payload]
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
        default: 
            return state;
            
    }
}

export default ui;