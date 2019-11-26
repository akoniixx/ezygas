import React, { Component } from 'react';
import { Route, withRouter, Switch, Redirect } from 'react-router-dom';
import Loadable from 'react-loadable';

/* TOPBAR && SIDEBAR */
// import TopNav from 'Containers/TopNav'
const TopNav = Loadable({
    loader: () => import('Containers/TopNav'),
    loading: () => null
  });
// import Sidebar from 'Containers/Sidebar';
const Sidebar = Loadable({
    loader: () => import('Containers/Sidebar'),
    loading: () => null
  });

/* TOPBAR && SIDEBAR */
// import activity from './activity';
const activity = Loadable({
    loader: () => import('./activity'),
    loading: () => null
  });
// import adminSystem from './adminSystem';
const adminSystem = Loadable({
    loader: () => import('./adminSystem'),
    loading: () => null
  });
// import analyze from './analyze';
const analyze = Loadable({
    loader: () => import('./analyze'),
    loading: () => null
  });
//import management from './management';
const management = Loadable({
    loader: () => import('./management'),
    loading: () => null
  });
//import orders from './orders';
const orders = Loadable({
    loader: () => import('./orders'),
    loading: () => null
  });
//import payment from './payment';
const payment = Loadable({
    loader: () => import('./payment'),
    loading: () => null
  });
//import users from './users';
const users = Loadable({
    loader: () => import('./users'),
    loading: () => null
  });

import _ from 'lodash';
import { urls } from 'Constants/defaultValues';
import { connect } from 'react-redux';
import { getNotification } from "Redux/actions";

class MainApp extends Component {
	componentDidMount() {
		this.props.getNotification();
	}
	render() {
		const { match, containerClassnames, notification } = this.props;
		const notificationPayment = _.get(notification, "notificationData")
		return (
			<div id="app-container" className={containerClassnames}>
				<TopNav history={this.props.history} notificationPayment={notificationPayment} />
				<Sidebar notificationPayment={notificationPayment} />
				<main >
					<div className="container-fluid" 
					style={notificationPayment? {paddingTop:"4rem"}:{}}
					>
						<Switch>
							<Route path={`${match.url}${urls.orders}`} component={orders} />
							<Route path={`${match.url}${urls.users}`} component={users} />
							<Route path={`${match.url}${urls.analyze}`} component={analyze} />
							<Route path={`${match.url}${urls.management}`} component={management} />
							<Route path={`${match.url}${urls.activity}`} component={activity} />
							<Route path={`${match.url}${urls.payment}`} component={payment} />
							<Route path={`${match.url}${urls.adminSystem}`} component={adminSystem} />
							{/* <Route path={`${match.url}layouts`} component={layouts} /> */}
							{/* <Redirect to={`/${urls.error}`} /> */}
						</Switch>
					</div>
				</main>
			</div>
		);
	}
}
const mapStateToProps = ({ menu, notification }) => {
	const { containerClassnames } = menu;
	return { containerClassnames, notification };
}



export default withRouter(connect(mapStateToProps, { getNotification })(MainApp));