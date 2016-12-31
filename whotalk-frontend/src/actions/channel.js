import CHANNEL from './ActionTypes/channel';
import { createAction } from 'redux-actions';
import * as service from 'services/channel';

export const initialize = createAction(CHANNEL.INITIALIZE);
export const setIdentity = createAction(CHANNEL.SET_IDENTITY);
export const checkInfo = (username) => ({
    type: CHANNEL.CHECK_INFO,
    payload: {
        promise: service.checkInfo(username)
    }
});

export const setSocketState = createAction(CHANNEL.SET_SOCKET_STATE);

export const receiveRealtimeData = createAction(CHANNEL.RECEIVE_REALTIME_DATA);
export const writeMessage = createAction(CHANNEL.WRITE_MESSAGE);
export const messageFailure = createAction(CHANNEL.MESSAGE_FAILURE);
export const removeMessage = createAction(CHANNEL.REMOVE_MESSAGE);

export const setInitialOnlineList = createAction(CHANNEL.SET_INITIAL_ONLINE_LIST);
export const addOnlineUser = createAction(CHANNEL.ADD_ONLINE_USER);
export const removeOnlineUser = createAction(CHANNEL.REMOVE_ONLINE_USER);


export const getRecentMsg = (username) => ({
    type: CHANNEL.GET_RECENT_MSG,
    payload: {
        promise: service.getRecentMsg(username)
    }
});

export const getMsgBefore = ({username, cursorId}) => ({
    type: CHANNEL.GET_MSG_BEFORE,
    payload: {
        promise: service.getMsgBefore(username, cursorId)
    }
});

export const getMsgBetween = ({username, startId, endId}) => ({
    type: CHANNEL.GET_MSG_BETWEEN,
    payload: {
        promise: service.getMsgBetween(username, startId, endId)
    }
});

export const setUserListIndex = createAction(CHANNEL.SET_USER_LIST_INDEX);

export const follow = (username) => ({
    type: CHANNEL.FOLLOW,
    payload: {
        promise: service.follow(username)
    }
});

export const followFromUserList = (username) => ({
    type: CHANNEL.FOLLOW_FROM_USER_LIST,
    payload: {
        promise: service.follow(username)
    }
});


export const unfollow = (username) => ({
    type: CHANNEL.UNFOLLOW,
    payload: {
        promise: service.unfollow(username)
    }
});

export const unfollowFromUserList = (username) => ({
    type: CHANNEL.UNFOLLOW_FROM_USER_LIST,
    payload: {
        promise: service.unfollow(username)
    }
});

export const getFollowers = ({username, followId}) => ({
    type: CHANNEL.GET_FOLLOWERS,
    payload: {
        promise: service.getFollowers({username, followId})
    }
});

export const getFollowing = ({username, followId}) => ({
    type: CHANNEL.GET_FOLLOWING,
    payload: {
        promise: service.getFollowing({username, followId})
    }
});

export const toggleUserInfoFollowButton = createAction(CHANNEL.TOGGLE_USER_INFO_FOLLOW_BUTTON);


export const clearUserList = createAction(CHANNEL.CLEAR_USER_LIST);


export const addFavorite = (username) => ({
    type: CHANNEL.ADD_FAVORITE,
    payload: {
        promise: service.addFavorite(username)
    }
});

export const deleteFavorite = (username) => ({
    type: CHANNEL.DELETE_FAVORITE,
    payload: {
        promise: service.deleteFavorite(username)
    }
});

export const getStatusMessage = (username) => ({
    type: CHANNEL.GET_STATUS_MSG,
    payload: {
        promise: service.getStatusMessage(username)
    }
});