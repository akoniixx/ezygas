import React, { Component, Fragment } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { IntlProvider } from 'react-intl';
import Loadable from 'react-loadable';
import { NotificationContainer } from "Components/ReactNotifications";
import { connect } from "react-redux";
import AppLocale from '../lang';

/* Routes */
const MainRoute = Loadable({
    loader: () => import('Routes'),
    loading: () => null
  });
const LandingPage = Loadable({
    loader: () => import("Routes/LandingPage"),
    loading: () => null
  });
const AuthLogin = Loadable({
    loader: () => import("Routes/auth/login"),
    loading: () => null
  });  
const AuthRegister = Loadable({
    loader: () => import("Routes/auth/register"),
    loading: () => null
  });
const AccountPending = Loadable({
    loader: () => import("Routes/LandingPage/accountPending"),
    loading: () => null
  });
const error = Loadable({
    loader: () => import('Routes/layouts/error'),
    loading: () => null
  });
const forgotPassword = Loadable({
    loader: () => import('Routes/layouts/forgot-password'),
    loading: () => null
  });

import { urls } from 'Constants/defaultValues';
import 'Assets/css/vendor/bootstrap.min.css'
import 'react-perfect-scrollbar/dist/css/styles.css';

const InitialPath = ({ component: Component, ...rest, authUser }) =>
	<Route
		{...rest}
		render={props =>
			<Component {...props} />
		}
	/>;

class App extends Component {

	render() {
		const { location, match, user, locale } = this.props;
		const currentAppLocale = AppLocale[locale];
		// currentAppLocale.locale = "en-ES"
		// if (location.pathname === '/'  || location.pathname==='/app'|| location.pathname==='/app/') {
		// 	return (<Redirect to={defaultStartPath} />);
		// }
		const publicComponent = (
			<Switch>
				<Route exact path={urls.landingPage} component={LandingPage} />
				<Route path={`/${urls.login}`} component={AuthLogin} />
				<Route path={`/${urls.register}`} component={AuthRegister} />
				
				<Route path={`/${urls.forgotPassword}`} component={forgotPassword} />
				<Route path={`/${urls.pending}`} component={AccountPending} />
				<Route path={`/${urls.error}`} component={error} />
				<Redirect to={`/${urls.error}`} />
			</Switch>
		);
		const nonPublicComponent = (
			<Switch>
				{location.pathname == urls.landingPage ?
					<Route render={props => <LandingPage {...props} isLoggedIn={true}/>}/> :
					<InitialPath path={match.url} component={MainRoute} />
				}
			</Switch>
		);
		return (
			<Fragment>
				<IntlProvider
					locale={currentAppLocale.locale}
					messages={currentAppLocale.messages}
				>
					<Fragment>
						<NotificationContainer />
						{user == null ? publicComponent : nonPublicComponent}
					</Fragment>
				</IntlProvider>
			</Fragment>
		);
	}
}

const mapStateToProps = ({ authUser, settings }) => {
	const { user } = authUser;
	const { locale } = settings;
	return { user, locale };
};

export default connect(mapStateToProps, {})(App);

