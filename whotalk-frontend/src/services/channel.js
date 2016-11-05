import request from 'helpers/request';

export const checkValidity = (username) => {
    return request({
        url: '/api/channel/valid/' + username
    });
}

export const getRecentMsg = (username) => {
    return request({
        url: '/api/channel/get-recent-msg/' + username
    });
}

export const getMsgBefore = (username, cursorId) => {
    return request({
        url: `/api/channel/get-msg-before/${username}/${cursorId}`
    });
}