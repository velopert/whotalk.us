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
        show: false
    }
};

function ui(state=initialState, action) {
    const payload = action.payload;

    switch (action.type) {
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
        default: 
            return state;
    }
}

export default ui;