import request from 'helpers/request';

export const checkUsername = (username) => {
    return request({url: '/api/authentication/exists/' + username});
}

export const checkEmail = (email) => {
    return request({url: 'http://localhost:4000/api/authentication/exists/email/' + email});
}

export const localRegister = ({username, password, familyName, givenName, gender, email}) => {
    return request('/api/authentication/register')
}