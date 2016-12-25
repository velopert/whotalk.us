import request from 'helpers/request';

export const getAccountSetting = () => {
    return request({
        url: '/api/mypage/account'
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