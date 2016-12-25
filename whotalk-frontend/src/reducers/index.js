import { combineReducers } from 'redux';
import form from './form';
import auth from './auth';
import ui from './ui';
import channel from './channel';
import explore from './explore';
import common from './common';
import mypage from './mypage';

const reducers = {
    form,
    auth,
    ui,
    channel,
    explore,
    common,
    mypage
}

export default combineReducers(reducers);