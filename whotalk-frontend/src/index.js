import React from 'react';
import ReactDOM from 'react-dom';
import {IntlProvider, addLocaleData} from 'react-intl';
import * as locale from 'locale';

import en from 'react-intl/locale-data/en';
import ko from 'react-intl/locale-data/ko';
import getLang from 'helpers/getLang';
import storage from 'helpers/storage';

addLocaleData([...en, ...ko]);

// REDUX

import { Provider } from 'react-redux';

import {App} from 'containers';

import store from './store';

const defaultLang = getLang().split('-')[0];
const storedLang = storage.get('language');

const language = storedLang ? storedLang.lang : defaultLang;


$(window).bind("load", function() {
    $('#loader').addClass('hide');
    ReactDOM.render((
        <Provider store={store}>
            <IntlProvider locale={language} messages={locale[language]} >
                <App/>
            </IntlProvider>
        </Provider>
    ), document.getElementById('root'));
});
