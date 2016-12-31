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
    email
}) => request({
    url: '/api/mypage/account',
    method: 'patch',
    data: {
        currentPassword,
        password,
        confirmPassword,
        givenName,
        familyName,
        email
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