import { combineReducers } from 'redux';
import form from './form';
import auth from './auth';
import ui from './ui';
import channel from './channel';
import explore from './explore';


const reducers = {
    form,
    auth,
    ui,
    channel,
    explore
}

export default combineReducers(reducers);