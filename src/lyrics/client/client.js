import React from 'react';
import ReactDOM from 'react-dom';
import {Router} from 'react-router';
import { browserHistory } from 'react-router';
import { Provider } from 'react-redux';

import store from 'lyrics/client/store';
import routes from 'lyrics/client/routes';
import clientStyles from 'lyrics/client/sass/styles.scss';

var appElement = document.getElementById('lyrics');

function renderDevtools() {
    if (process.env.NODE_ENV === 'development') {
        var Devtools = require('lyrics/client/devtools');
        return <Devtools store={store} />;
    }
}

//
// Render Town
//
ReactDOM.render((
    <div>
        <Provider store={store}>
            <Router history={browserHistory} routes={routes}/>
        </Provider>
        {renderDevtools()}
    </div>
), appElement);
