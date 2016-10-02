import { combineReducers } from 'redux';
import form from './form';
import auth from './auth';


const reducers = {
    form,
    auth
}

export default combineReducers(reducers);