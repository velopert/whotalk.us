import request from 'helpers/request';

export const getInitialActivity = () => {
    return request({
        url: '/api/activity'
    });
}

export const getActivityBefore= (activityId) => {
    return request({
        url: '/api/activity/before/' + activityId
    });
}