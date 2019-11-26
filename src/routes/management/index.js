import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { urls } from 'Constants/defaultValues';

import customermanagement from './customer-management';
import productmanagement from './product-management';
import privatepricemanagement from './privatePrice-management';

const Dashboards = ({ match }) => (
    <div className="dashboard-wrapper">
        <Switch>
            <Redirect exact from={`${match.url}/`} to={`${match.url}/${urls.productManagement}`} />
            <Route path={`${match.url}/${urls.customerManagement}`} component={customermanagement} />
            <Route path={`${match.url}/${urls.productManagement}`} component={productmanagement} />
            <Route path={`${match.url}/${urls.privatePriceManagement}`} component={privatepricemanagement} />
            <Redirect to={`/${urls.error}`}/>
        </Switch>
    </div>
);
export default Dashboards;