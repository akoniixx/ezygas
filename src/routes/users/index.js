import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { urls } from 'Constants/defaultValues';

import store from './store';


const Users = ({ match }) => (
    <div className="dashboard-wrapper">
        <Switch>
            <Redirect exact from={`${match.url}/`} to={`${match.url}/${urls.store}`} />
            <Route path={`${match.url}/${urls.store}`} component={store} />
            <Redirect to={`/${urls.error}`} />
        </Switch>
    </div>
);
export default Users;