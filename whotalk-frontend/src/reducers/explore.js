import EXPLORE from 'actions/ActionTypes/explore';
import * as rs from 'helpers/requestStatus';

const initialState = {
    activityData: [],
    sidebarLinks: {
        favoriteChannels: [],
        recentVisits: []
    },
    isLast: false,
    requests: {
        getInitialActivity: {
            ...rs.request
        },
        getActivityBefore: {
            ...rs.request
        },
        getSidebarLinks: {
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

        case EXPLORE.TOGGLE_FOLLOW_BUTTON_IN_ACTIVITY: 

            // shortened references

            var activityData = state.activityData;
            var selectedActivity = activityData[payload.activityIndex];
            var users = selectedActivity.payload.follow.followee
            var selectedUser = selectedActivity
                               .payload
                               .follow
                               .followee[payload.userIndex];
            
            console.log(selectedUser);
            console.log();


            return {
                ...state,
                activityData: [
                    ...activityData.slice(0, payload.activityIndex),
                    { 
                        ...selectedActivity,
                        payload: {
                            ...selectedActivity.payload,
                            follow: {
                                ...selectedActivity.payload.follow,
                                followee: [
                                    ...users.slice(0, payload.userIndex),
                                    {
                                        ...selectedUser,
                                        disabled: !(selectedUser.disabled),
                                            // if disabled turns true->false, then also toggle the following
                                            // else remains the same
                                            following: selectedUser.disabled ? !(selectedUser.following) : selectedUser.following
                                    },
                                    ...users.slice(payload.userIndex+1, users.length)
                                ]
                            }
                        }
                    },
                    ...activityData.slice(payload.activityIndex + 1, activityData.length)
                ]
            }      


        case EXPLORE.GET_SIDEBAR_LINKS + '_PENDING':
            return {
                ...state,
                requests: {
                    ...state.requests,
                    getSidebarLinks: {
                        ...rs.pending
                    }
                }
            }
        
        case EXPLORE.GET_SIDEBAR_LINKS + '_FULFILLED':
            return {
                ...state,
                sidebarLinks: payload.data,
                requests: {
                    ...state.requests,
                    getSidebarLinks: {
                        ...rs.fulfilled
                    }
                }
            }

        case EXPLORE.GET_SIDEBAR_LINKS + '_REJECTED':
            return {
                ...state,
                requests: {
                    ...state.requests,
                    getSidebarLinks: {
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