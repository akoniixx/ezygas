import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { urls } from 'Constants/defaultValues';
import order from './orders';
import orderlist from './order-list';
import pos from './pos';

import posnew from './pos-new';

const Dashboards = ({ match }) => (
    <div className="dashboard-wrapper">
        <Switch>
            <Redirect exact from={`${match.url}/`} to={`${match.url}/${urls.order}`} />
            <Route path={`${match.url}/${urls.order}`} component={order} />
            <Route path={`${match.url}/${urls.orderList}`} component={orderlist} />
            <Route path={`${match.url}/${urls.ecommerce}`} component={pos} />
            //!Test new pos
            <Route path={`${match.url}/testPOS`} component={posnew} />
            <Redirect to={`/${urls.error}`} />
        </Switch>
    </div>
);
export default Dashboards;