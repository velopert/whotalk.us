import EXPLORE from 'actions/ActionTypes/explore';
import * as rs from 'helpers/requestStatus';

const initialState = {
    activityData: [],
    isLast: false,
    requests: {
        getInitialActivity: {
            ...rs.request
        },
        getActivityBefore: {
            ...rs.request
        }
    }
}



function explore(state = initialState, action) {
    const payload = action.payload;

    switch(action.type) {
        case EXPLORE.INITIALIZE:
            return {
                ...initialState
            }


        case EXPLORE.GET_INITIAL_ACTIVITY + '_PENDING':
            return {
                ...state,
                requests: {
                    ...state.requests,
                    getInitialActivity: {
                        ...rs.pending
                    }
                }
            }
        
        case EXPLORE.GET_INITIAL_ACTIVITY + '_FULFILLED':
            return {
                ...state,
                activityData: [...payload.data.activities],
                isLast: payload.data.activities.length === 20 ? false : true,
                requests: {
                    ...state.requests,
                    getInitialActivity: {
                        ...rs.fulfilled
                    }
                }
            }

        case EXPLORE.GET_INITIAL_ACTIVITY + '_REJECTED':
            return {
                ...state,
                requests: {
                    ...state.requests,
                    getInitialActivity: {
                        ...rs.rejected,
                        error: payload
                    }
                }
            }

        case EXPLORE.GET_ACTIVITY_BEFORE + '_PENDING':
            return {
                ...state,
                requests: {
                    ...state.requests,
                    getActivityBefore: {
                        ...rs.pending
                    }
                }
            }
        
        case EXPLORE.GET_ACTIVITY_BEFORE + '_FULFILLED':
            return {
                ...state,
                activityData: [...state.activityData,...payload.data.activities],
                isLast: payload.data.activities.length === 20 ? false : true,
                requests: {
                    ...state.requests,
                    getActivityBefore: {
                        ...rs.fulfilled
                    }
                }
            }

        case EXPLORE.GET_ACTIVITY_BEFORE + '_REJECTED':
            return {
                ...state,
                requests: {
                    ...state.requests,
                    getActivityBefore: {
                        ...rs.rejected,
                        error: payload
                    }
                }
            }

        default:
            return state;
    }
}



export default explore;