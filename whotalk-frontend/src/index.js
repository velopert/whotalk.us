import React from 'react';
import ReactDOM from 'react-dom';
import {IntlProvider, addLocaleData} from 'react-intl';
import * as locale from 'locale';

import en from 'react-intl/locale-data/en';
import ko from 'react-intl/locale-data/ko';

addLocaleData([...en, ...ko]);

// REDUX

import { Provider } from 'react-redux';

import {App} from 'containers';

import store from './store';



$(window).bind("load", function() {
    $('#loader').addClass('hide');
    ReactDOM.render((
        <Provider store={store}>
            <IntlProvider locale="ko" messages={locale['ko']} >
                <App/>
            </IntlProvider>
        </Provider>
    ), document.getElementById('root'));
});
