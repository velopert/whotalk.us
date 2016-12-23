import request from 'helpers/request';

export const getSearchUser = (username) => {
    return request({
        url: '/api/common/search-user/' + username
    });
};
