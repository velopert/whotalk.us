import request from 'helpers/request';

export const checkValidity = (username) => {
    return request({
        url: '/api/channel/valid/' + username
    });
}