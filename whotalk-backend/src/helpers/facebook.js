// make sure that it loads the env
import dotenv from 'dotenv';
dotenv.config(); // LOAD CONFIG

import request from './request';

const facebook = {
    access_token: null,
    appId: '2114304178795129',
    appSecret: process.env.FACEBOOK_SECRET
};

// initialize facebook
facebook.init = async () => {
    try {
        const response = await request({url: `https://graph.facebook.com/oauth/access_token?client_id=${facebook.appId}&client_secret=${facebook.appSecret}&grant_type=client_credentials`})  
        facebook.access_token = response.data.split('=')[1]
        console.log('Facebook initialized');
    } catch (e) {
        console.log(e)
    }
}

//FB.api(path, method, params, callback)

facebook.api = async ({
    path,
    method = 'get'
}) => {
    return request({
        url: `https://graph.facebook.com/v2.8${path}?access_token=${facebook.access_token}`
    });    
}

export default facebook;