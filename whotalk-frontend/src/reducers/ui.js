import UI from 'actions/ActionTypes/ui';

const initialState = {
    sidebar: {
        show: false
    }
};

function ui(state=initialState, action) {
    switch (action.type) {
        case UI.TOGGLE_SIDEBAR:
            return {
                ...state,
                sidebar: {
                    ...state.sidebar,
                    show: !state.sidebar.show
                }
            }
        default: 
            return state;
    }
}

export default ui;