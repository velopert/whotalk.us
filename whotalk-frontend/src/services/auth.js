import request from 'utils/request';

export const checkUsername = (username) => {
    return request('/api/authentication/exists/velopert');
}