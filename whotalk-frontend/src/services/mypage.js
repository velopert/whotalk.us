import request from 'helpers/request';

export const getInitialSetting = () => {
    return request({
        url: '/api/mypage/'
    });
}

export const updateAccountSetting = ({
    currentPassword,
    password,
    confirmPassword,
    givenName,
    familyName,
    email,
    image
}) => request({
    url: '/api/mypage/account',
    method: 'patch',
    data: {
        currentPassword,
        password,
        confirmPassword,
        givenName,
        familyName,
        email,
        image
    }
});

export const updateChannelSetting = ({
    message
}) => request({
    url: '/api/mypage/channel',
    method: 'patch',
    data: {
        message
    }
});

export const clearMessage = () => request({
    url: '/api/mypage/message',
    method: 'delete'
});

export const unregister = () => request({
    url: '/api/mypage/unregister',
    method: 'delete'
});