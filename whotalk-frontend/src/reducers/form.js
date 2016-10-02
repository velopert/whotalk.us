import FORM from 'actions/ActionTypes/form';

const initialState = {
    register: {
        username: '',
        password: ''
    },
    login: {
        username: '',
        password: ''
    },
    error: {
        register: {
            username: false,
            password: false
        }
    }
}

function form(state=initialState, action) {
    const payload = action.payload;
    switch(action.type) {
        case FORM.CHANGE_INPUT:
            const newForm = {};
            newForm[payload.form] = {...state[payload.form]};
            newForm[payload.form][payload.name] = payload.value;
            return {
                ...state,
                ...newForm
            };
        case FORM.SET_INPUT_ERROR: 
            const err = {};
            err[payload.form] = {...state.error[payload.form]};
            err[payload.form][payload.name] = payload.error
            return {
                ...state,
                error: {
                    ...state.error,
                    ...err
                }
            }
        case FORM.FORM_RESET: 
            return initialState;
        default:
            return state;
    }
}

export default form;
