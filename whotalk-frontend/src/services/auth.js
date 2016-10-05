import request from 'helpers/request';

export const checkUsername = (username) => {
    return request({
        url: '/api/authentication/exists/' + username
    });
}

export const checkEmail = (email) => {
    return request({
        url: '/api/authentication/exists/email/' + email
    });
}

export const localRegister = ({
    username,
    password,
    familyName,
    givenName,
    gender,
    email
}) => request({
    url: '/api/authentication/register',
    method: 'post',
    data: {
        username,
        password,
        familyName,
        givenName,
        gender,
        email
    }
})