import React from 'react';
import { Route, IndexRoute } from 'react-router';

import AppHandler from 'lyrics/client/components/AppHandler';
import ErrorHandler from 'lyrics/client/components/ErrorHandler';
import MainPage from 'lyrics/client/components/MainPage';
import OtherPage from 'lyrics/client/components/OtherPage';

var routes = (
    <Route component={AppHandler} path="/">
        <IndexRoute component={MainPage} />
        <Route path="other" component={OtherPage} />
        <Route path="*" component={ErrorHandler}/>
    </Route>
);

module.exports = routes;
