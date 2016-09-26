import React from 'react';
import ReactDOM from 'react-dom';

// REDUX
import {applyMiddleware, createStore, Provider} from 'redux';
import {thunk} from 'redux-thunk';
import createLogger from 'redux-logger';
import reducers from 'reducers';

import {App} from 'containers';

// REDUX SETUP

const logger = createLogger();
const store = createStore(reducers, applyMiddleware(thunk, logger));

ReactDOM.render((
    <Provider store={store}>
        <App/>
    </Provider>
), document.getElementById('root'));