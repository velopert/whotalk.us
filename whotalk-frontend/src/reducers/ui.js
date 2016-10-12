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
        default: 
            return state;
    }
}

export default ui;