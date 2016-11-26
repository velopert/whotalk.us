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

const session = {
    sessionID: null,
    user: {
        _id: null,
        common_profile: {
            email: null,
            familyName: null,
            givenName: null,
            gender: null,
            thumbnail: "none",
            username: null
        },
        type: null
    },
    followInfo: {
        followers: 0,
        following: 0
    },
    logged: false
}

const submitStatus = {
    register: false,
    additional: false,
    additional_o: false,
    login: false
}

const initialState = {
    register: { ...register },
    session: { ...session },
    requests: {
        checkUsername: {
            ...request
        },
        checkEmail: {
            ...request
        },
        localRegister: {
            ...request
        },
        localLogin: {
            ...request
        },
        checkSession: {
            ...request
        },
        oauthRegister: {
            ...request
        }
    },
    submitStatus: { ...submitStatus }
};

const pending = {fetching: true, fetched: false, error: null};
const fulfilled = {fetching: false, fetched: true, error: null};
const rejected = {fetching: false, fetched: false}

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
                    checkUsername: { ...rejected, error: payload }
                }
            };

        
        /* CHECK_EMAIL */

        case AUTH.CHECK_EMAIL + "_PENDING": 
            return {
                ...state,
                requests: {
                    ...state.requests,
                    checkEmail: { fetching: true, fetched: false, error: null }
                }
            }

        case AUTH.CHECK_EMAIL + '_FULFILLED': 
            return {
                ...state,
                register: {
                    ...state.register,
                    status: {
                        ...state.register.status,
                        emailExists: payload.data.exists
                    }
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
                    ...state.requests,
                    checkEmail: { ...rejected, error: payload }
                }
            };

        /* LOCAL_LOGIN */

        case AUTH.LOCAL_LOGIN + 'PENDING':
            return {
                ...state,
                requests: {
                    ...state.requests,
                    localLogin: { ...pending }
                }
            };

        case AUTH.LOCAL_LOGIN + '_FULFILLED':
            return {
                ...state,
                requests: {
                    ...state.requests,
                    localLogin: { ...fulfilled }
                },
                session: {
                    ...state.session,
                    user: payload.data.user,
                    logged: true
                }
            };

        case AUTH.LOCAL_LOGIN + '_REJECTED':
            return {
                ...state,
                requests: {
                    ...state.requests,
                    localLogin: { ...rejected, error: payload }
                },
                session: {
                    user: {...session.user},
                    logged: false
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
                    ...state.register,
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
                    ...state.requests,
                    localRegister: {...pending}
                }
            };

        case AUTH.LOCAL_REGISTER + "_FULFILLED": 
            return {
                ...state,
                register: {
                    ...state.register,
                    status: {
                        ...state.registerStatus,
                        success: payload.data.user !== undefined
                    }
                },
                requests: {
                    ...state.requests,
                    localRegister: {...fulfilled}
                }
            };

        case AUTH.LOCAL_REGISTER + "_REJECTED":
            return {
                ...state,
                registerStatus: {
                    ...state.registerStatus,
                    success: false
                },
                requests: {
                    ...state.requests,
                    localRegister: { ...rejected, error: payload}
                }
            }

        case AUTH.CHECK_SESSION + "_PENDING":
            return {
                ...state,
                requests: {
                    ...state.requests,
                    checkSession: { ...pending }
                }
            }
        
        case AUTH.CHECK_SESSION + "_FULFILLED":
            return {
                ...state,
                requests: {
                    ...state.requests,
                    checkSession: { ...fulfilled }
                },
                session: {
                    sessionID: payload.data.sessionID,
                    user: payload.data.user === null ? {...session.user} : payload.data.user,
                    logged: (payload.data.user !== null && payload.data.user.common_profile.username !== null)
                },
                followInfo: {
                    ...payload.data.followInfo
                }
            }

        case AUTH.CHECK_SESSION + "_REJECTED":
            return {
                ...state,
                requests: {
                    ...state.requests,
                    checkSession: { ...rejected, error: payload }
                }
            }

        case AUTH.OAUTH_REGISTER + "_PENDING":
            return {
                ...state,
                request: {
                    ...state.requests,
                    oauthRegister: { ...pending }
                }
            }
            
        case AUTH.OAUTH_REGISTER + "_FULFILLED":
            return {
                ...state,
                requests: {
                    ...state.requests,
                    checkSession: { ...fulfilled }
                }
            }

        case AUTH.OAUTH_REGISTER + "_REJECTED":
            return {
                ...state,
                requests: {
                    ...state.requests,
                    checkSession: { ...rejected, error: payload }
                }
            }
        

        default:
            return state;
    }
}

export default auth;
