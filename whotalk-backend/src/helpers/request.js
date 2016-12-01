import axios from 'axios';

/*
    Returns a Axios Request Promise
*/

export default function request({url, method = 'get', data, config}) {
    return axios({
        method,
        url,
        data,
        ...config
    }).then(
        response => {
            return response;
        }
    ).catch(
        error => { 
            throw error; 
        }
    );
}