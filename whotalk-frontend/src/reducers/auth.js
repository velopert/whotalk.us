import AUTH from 'actions/ActionTypes/auth';

const request = {
    fetching: false,
    fetched: false,
    error: null
}

const register = {
    username: '',
    password: '',
    usernameExists: false
}

const initialState = {
    register: { ...register },
    requests: {
        checkUsername: {
            ...request
        }
    }
};


function auth(state=initialState, action) {
    const payload = action.payload;

   

    switch(action.type) {
        
        /* CHECK_USERNAME */

        case AUTH.CHECK_USERNAME + "_PENDING": 
            return {
                ...state,
                requests: {
                    checkUsername: {
                        fetching: true,
                        fetched: false,
                        error: null
                    }
                }
            }

        case AUTH.CHECK_USERNAME + '_FULFILLED': 
            return {
                ...state,
                register: {
                    ...state.register,
                    usernameExists: payload.data.exists
                },
                requests: {
                    ...state.requests,
                    checkUsername: {
                        fetching: false,
                        fetched: true,
                        error: null
                    }
                }
            };
        case AUTH.CHECK_USERNAME + '_REJECTED':
            return {
                ...state,
                requests: {
                    checkUsername: {
                        fetching: false,
                        error: payload
                    }
                }
            };

        /* LOCAL_REGISTER_PRIOR */

        case AUTH.LOCAL_REGISTER_PRIOR: 
            return {
                ...state,
                register: {
                    ...state.register,
                    username: payload.username,
                    password: payload.password
                }
            }

        default:
            return state;
    }
}

export default auth;
