import { combineReducers } from 'redux';
import form from './form';
import auth from './auth';
import ui from './ui';
import channel from './channel';

const reducers = {
    form,
    auth,
    ui,
    channel
}

export default combineReducers(reducers);