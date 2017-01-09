import {applyMiddleware, createStore} from 'redux';
import thunk from 'redux-thunk';
import createLogger from 'redux-logger';
import reducers from 'reducers';
import promiseMiddleware from 'redux-promise-middleware';

const logger = createLogger();

const middlewares = [thunk, promiseMiddleware()];
if(process.env.NODE_ENV === 'development') {
    middlewares.push(logger);
}

const store = createStore(reducers, applyMiddleware(...middlewares));

export default store;