import request from 'utils/request';

export const checkUsername = (username) => {
    return request('/api/authentication/exists/velopert');
}

export const localRegister = ({username, password, familyName, givenName, gender, email}) => {
    return request('/api/authentication/register')
}