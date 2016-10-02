import {applyMiddleware, createStore} from 'redux';
import thunk from 'redux-thunk';
import createLogger from 'redux-logger';
import reducers from 'reducers';
import promiseMiddleware from 'redux-promise-middleware';

const logger = createLogger();
const store = createStore(reducers, applyMiddleware(thunk, logger, promiseMiddleware()));

export default store;