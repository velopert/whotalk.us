import FORM from 'actions/ActionTypes/form';

const initialState = {
    register: {
        username: '',
        password: ''
    },
    additional: {
        firstName: '',
        lastName: '',
        email: '',
        gender: ''
    },
    additional_o: {
        username: ''
    },
    login: {
        username: '',
        password: ''
    },
    chat: {
        message: ''
    },
    error: {
        register: {
            username: false,
            password: false
        },
        additional: {
            firstName: false,
            lastName: false,
            email: false,
            gender: false
        },
        additional_o: {
            username: false
        },
        accountSetting: {
            currentPassword: false,
            password: false,
            confirmPassword: false,
            email: false,
            givenName: false,
            familyName: false
        },
        channelSetting: {
            statusMessage: false
        }
    },
    search: {
        keyword: ''
    },

    accountSetting: {
        currentPassword: '',
        password: '',
        confirmPassword: '',
        email: '',
        givenName: '',
        familyName: ''
    },

    channelSetting: {
        statusMessage: ''
    }
}

function form(state = initialState, action) {
    const payload = action.payload;
    switch (action.type) {
        case FORM.CHANGE_INPUT:
            return {
                ...state,
                [payload.form]: {
                    ...state[payload.form],
                    [payload.name]: payload.value
                }
            };
        case FORM.SET_INPUT_ERROR:
            const err = {};
            err[payload.form] = {
                ...state.error[payload.form]
            };
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
        case FORM.ERROR_RESET: 
            return {
                ...state,
                error: {
                    ...initialState.error
                }
            };
        default:
            return state;
    }
}

export default form;
