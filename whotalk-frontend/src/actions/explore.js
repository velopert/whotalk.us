import EXPLORE from './ActionTypes/explore';
import { createAction } from 'redux-actions';
import * as service from 'services/explore';
import { follow, unfollow } from 'services/channel';



export const initialize = createAction(EXPLORE.INITIALIZE);

export const getInitialActivity = () => ({
    type: EXPLORE.GET_INITIAL_ACTIVITY,
    payload: {
        promise: service.getInitialActivity()
    }
});

export const getActivityBefore = (activityId) => ({
    type: EXPLORE.GET_ACTIVITY_BEFORE,
    payload: {
        promise: service.getActivityBefore(activityId)
    }
});


/* related to following...*/
export const toggleFollowButtonInActivity = createAction(EXPLORE.TOGGLE_FOLLOW_BUTTON_IN_ACTIVITY);

export const followFromActivity = (username) => ({
    type: EXPLORE.FOLLOW_FROM_ACTIVITY,
    payload: {
        promise: follow(username)
    }
});

export const unfollowFromActivity = (username) => ({
    type: EXPLORE.UNFOLLOW_FROM_ACTIVITY,
    payload: {
        promise: unfollow(username)
    }
});

export const getSidebarLinks = () => ({
    type: EXPLORE.GET_SIDEBAR_LINKS,
    payload: {
        promise: service.getSidebarLinks()
    }
});