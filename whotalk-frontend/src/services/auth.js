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
});

export const localLogin = ({
    username,
    password
}) => request({
    url: '/api/authentication/login',
    method: 'post',
    data: {
        username,
        password
    }
});

export const checkSession = () => request({
    url: '/api/authentication/check'
});