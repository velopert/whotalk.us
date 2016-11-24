import request from 'helpers/request';

export const getInitialActivity = () => {
    return request({
        url: '/api/activity'
    });
}