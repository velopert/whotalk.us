import { combineReducers } from 'redux';
import form from './form';
import auth from './auth';
import ui from './ui';

const reducers = {
    form,
    auth,
    ui
}

export default combineReducers(reducers);