import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { urls } from 'Constants/defaultValues';
import Loadable from 'react-loadable';

// import approve from './approve-list';
const approve = Loadable({
    loader: () => import('./approve-list'),
    loading: () => null
  });
// import vendorManagement from './vendorManagement';
const vendorManagement = Loadable({
    loader: () => import('./vendorManagement'),
    loading: () => null
  });

const AdminSystem = ({ match }) => (
    <div className="dashboard-wrapper">
        <Switch>
            <Redirect exact from={`${match.url}/`} to={`${match.url}/${urls.vendorManagement}`} />
            <Route path={`${match.url}/${urls.vendorManagement}`} component={vendorManagement} />
            <Route path={`${match.url}/${urls.approve}`} component={approve} />
            <Redirect to={`/${urls.error}`} />
        </Switch>
    </div>
);
export default AdminSystem;
