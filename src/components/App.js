import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import Navigation from './Navigation/Navigation';

import LandingPage from './Landing';
import SignUpPage from './SignUp/SignUp';
import SignInPage from './SignIn/SignIn';
import HomePage from './Home';
import AccountPage from './Account';

import * as routes from '../constants/routes';
import './App.css';

class App extends Component {
	render() {
		return (
			<MuiThemeProvider>
				<Router>
					<div>
						<div className="pagewrap">
							<Route
								exact
								path={routes.LANDING}
								component={() => <LandingPage />}
							/>
							<Route
								exact
								path={routes.SIGN_UP}
								component={() => <SignUpPage />}
							/>
							<Route
								exact
								path={routes.SIGN_IN}
								component={() => <SignInPage />}
							/>
							<Route
								exact
								path={routes.Questions}
								component={() => <HomePage />}
							/>
							<Route
								exact
								path={routes.Results}
								component={() => <AccountPage />}
							/>
						</div>
						<Navigation />
					</div>
				</Router>
			</MuiThemeProvider>
		);
	}
}

export default App;
