import request from 'helpers/request';

export const checkInfo = (username) => {
    return request({
        url: '/api/channel/info/' + username
    });
}

export const getRecentMsg = (username) => {
    return request({
        url: '/api/message/recent/' + username
    });
}

export const getMsgBefore = (username, cursorId) => {
    return request({
        url: `/api/message/before/${username}/${cursorId}`
    });
}

export const getMsgBetween = (username, startId, endId) => {
    return request({
        url: `/api/message/between/${username}/${startId}/${endId}`
    });
}

export const follow = (username) => {
    return request({
        url:  '/api/follow/' + username,
        method: 'post'
    });
}


export const unfollow = (username) => {
    return request({
        url:  '/api/follow/' + username,
        method: 'delete'
    });
}

export const getFollowers = ({username, followId = ''}) => {
    return request ({
        url: '/api/follow/' + username + '/' + followId
    })
}