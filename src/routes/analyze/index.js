import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { urls } from 'Constants/defaultValues';

import dashboards from './dashboards';

const Dashboards = ({ match }) => (
    <div className="dashboard-wrapper">
        <Switch>
            <Route exact path={`${match.url}/${urls.dashboards}`} component={dashboards} />
            <Route path={`${match.url}/${urls.dashboards}`} component={dashboards} />
            <Redirect to="/error" />
        </Switch>
    </div>
);
export default Dashboards;