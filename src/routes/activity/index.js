import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { urls } from 'Constants/defaultValues';

import history from './history';

const Layouts = ({ match }) => (
    <div className="dashboard-wrapper">
        <Switch>
            <Redirect exact from={`${match.url}/`} to={`${match.url}/${urls.history}`} />
            <Route path={`${match.url}/${urls.history}`} component={history} />
            <Redirect to={`/${urls.error}`} />
        </Switch>
    </div>
);

export default Layouts;