import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { urls } from 'Constants/defaultValues';

import packages from './packages';
import confirmPackage from './confirmPackage';
import confirmPayment from './confirmPayment';


const Dashboards = ({ match }) => (
    <div className="dashboard-wrapper">
        <Switch>
            <Redirect exact from={`${match.url}/`} to={`${match.url}/${urls.package}`} />
            <Route path={`${match.url}/${urls.package}`} component={packages} />
            <Route path={`${match.url}/${urls.confirmPackage}`} component={confirmPackage} />
            <Route path={`${match.url}/${urls.confirmPayment}`} component={confirmPayment} />
            <Redirect to={`/${urls.error}`}/>
        </Switch>
    </div>
);
export default Dashboards;