import request from 'helpers/request';

export const getAccountSetting = () => {
    return request({
        url: '/api/mypage/account'
    });
}