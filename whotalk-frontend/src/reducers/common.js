import COMMON from 'actions/ActionTypes/common';
import * as rs from 'helpers/requestStatus';

const initialState = {
    search: {
        result: []
    },
    requests: {
        getSearchUsers: {
            ...rs.request
        }
    }
}

function common(state = initialState, action) {
    const payload = action.payload;

    switch(action.type) {
        case COMMON.SEARCH_INITIALIZE:
            return {
                ...state,
                search: {
                    ...initialState.search
                }
            };
        
        case COMMON.SEARCH_USER_GET + '_PENDING':
            return {
                ...state,
                requests: {
                    ...state.requests,
                    getSearchUsers: {
                        ...rs.pending
                    }
                }
            };
        
        case COMMON.SEARCH_USER_GET + '_FULFILLED':
            return {
                ...state,
                search: {
                    ...state.search,
                    result: payload.data.result
                },
                requests: {
                    ...state.requests,
                    getSearchUsers: {
                        ...rs.fulfilled
                    }
                }
            };
        
        case COMMON.SEARCH_USER_GET + '_REJECTED':
            return {
                ...state,
                requests: {
                    ...state.requests,
                    getSearchUsers: {
                        ...rs.rejected,
                        error: payload
                    }
                }
            }
        
        default:
            return state;
    }
}

export default common;