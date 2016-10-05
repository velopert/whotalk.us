import AUTH from 'actions/ActionTypes/auth';

const request = {
    fetching: false,
    fetched: false,
    error: null
}

const registerStatus = {
    usernameExists: false,
    emailExists: false,
    success: false
}
const register = {
    username: '',
    password: '',
    status : {
        ...registerStatus
    }
}

const submitStatus = {
    register: false,
    additional: false
}

const initialState = {
    register: { ...register },
    requests: {
        checkUsername: {
            ...request
        },
        checkEmail: {
            ...request
        },
        localRegister: {
            ...request
        }
    },
    submitStatus: { ...submitStatus }
};

const pending = {fetching: true, fetched: false, error: null};
const fulfilled = {fetching: false, fetched: true, error: null};


function auth(state=initialState, action) {
    const payload = action.payload
    
    switch(action.type) {
        
        /* CHECK_USERNAME */
        case AUTH.CHECK_USERNAME + "_PENDING": 
            return {
                ...state,
                requests: {
                    ...state.requests,
                    checkUsername: { fetching: true, fetched: false, error: null }
                }
            }

        case AUTH.CHECK_USERNAME + '_FULFILLED': 
            return {
                ...state,
                register: {
                    ...state.register,
                    status: {
                        ...state.register.status,
                        usernameExists: payload.data.exists
                    }
                },
                requests: {
                    ...state.requests,
                    checkUsername: { fetching: false, fetched: true, error: null }
                }
            };
        case AUTH.CHECK_USERNAME + '_REJECTED':
            return {
                ...state,
                requests: {
                     ...state.requests,
                    checkUsername: { fetching: false, error: payload }
                }
            };

        /* CHECK_EMAIL */

        case AUTH.CHECK_EMAIL + "_PENDING": 
            return {
                ...state,
                requests: {
                    checkEmail: { fetching: true, fetched: false, error: null }
                }
            }

        case AUTH.CHECK_EMAIL + '_FULFILLED': 
            return {
                ...state,
                register: {
                    ...state.register,
                    emailExists: payload.data.exists
                },
                requests: {
                    ...state.requests,
                    checkEmail: { fetching: false, fetched: true, error: null }
                }
            };
        case AUTH.CHECK_EMAIL + '_REJECTED':
            return {
                ...state,
                requests: {
                    checkEmail: { fetching: false, error: payload }
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


        /* RESET_REGISTER_STATUS */

        case AUTH.RESET_REGISTER_STATUS:
            return {
                ...state,
                register: {
                    ...state,
                    status: {
                        ...registerStatus
                    }
                }
            };
        
        /* SET_SUBMIT_STATUS */
        case AUTH.SET_SUBMIT_STATUS:
            return {
                ...state,
                submitStatus: {
                    ...submitStatus,
                    [payload.name]: payload.value
                }
            };
        
        case AUTH.LOCAL_REGISTER + "_PENDING": 
            return {
                ...state,
                requests: {
                    localRegister: {...pending}
                }
            };

        case AUTH.LOCAL_REGISTER + "_FULFILLED": 
            return {
                ...state,
                registerStatus: {
                    ...state.registerStatus,
                    success: (payload.data.user !== undefined)
                },
                requests: {
                    localRegister: {...fulfilled}
                }
            };


        

        default:
            return state;
    }
}

export default auth;
