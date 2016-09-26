import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';


const reducers = {
    // ... other reducers
    form: formReducer
}

export default combineReducers(reducers);