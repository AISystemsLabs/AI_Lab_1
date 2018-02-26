import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import Paper from 'material-ui/Paper';
import Chip from 'material-ui/Chip';
import Avatar from 'material-ui/Avatar';
import FontIcon from 'material-ui/FontIcon';
import {
	BottomNavigation,
	BottomNavigationItem,
} from 'material-ui/BottomNavigation';

import * as routes from '../../constants/routes';
import * as auth from '../../firebase/auth';

import './Navigation.css';

export const questionsIcon = <FontIcon className="ion-ios-help" />;
export const resultsIcon = <FontIcon className="ion-ios-pie" />;
export const logOutIcon = <FontIcon className="ion-log-out" />;
export const signInIcon = <FontIcon className="ion-log-in" />;
export const signUpIcon = <FontIcon className="ion-android-person-add" />;

class Navigation extends Component {
	state = {
		selectedIndex: 0,
	};

	getindexByLocation = () => {
		let dict = {};
		dict[routes.Questions] = 0;
		dict[routes.Results] = 1;
		dict[routes.SIGN_IN] = 2;
		dict[routes.SIGN_UP] = 3;

		return dict[this.props.location.pathname];
	};

	componentDidMount() {
		let user = {};
		if (auth.isLoggedIn()) {
			console.log(auth.getUser());
			user = auth.getUser();
		}
	}

	render() {
		let user = {};
		if (auth.isLoggedIn()) {
			console.log(auth.getUser());
			user = auth.getUser();
		}
		return (
			<div className="footer">
				<Paper zDepth={1}>
					<BottomNavigation
						selectedIndex={this.getindexByLocation()}
						style={{ height: '70px' }}
					>
						<BottomNavigationItem
							label="Анкета"
							icon={questionsIcon}
							onClick={() => {
								this.props.history.push(routes.Questions);
							}}
						/>
						<BottomNavigationItem
							label="Результати"
							icon={resultsIcon}
							onClick={() => this.props.history.push(routes.Results)}
						/>
						{!auth.isLoggedIn() && (
							<BottomNavigationItem
								label="Увійти"
								icon={signInIcon}
								onClick={() => this.props.history.push(routes.SIGN_IN)}
							/>
						)}
						{!auth.isLoggedIn() && (
							<BottomNavigationItem
								label="Реєстрація"
								icon={signUpIcon}
								onClick={() => this.props.history.push(routes.SIGN_UP)}
							/>
						)}
						{auth.isLoggedIn() && (
							<BottomNavigationItem
								label="Вийти"
								icon={logOutIcon}
								onClick={() => {
									auth
										.logOut()
										.subscribe(() => this.props.history.push(routes.LANDING));
								}}
							/>
						)}
					</BottomNavigation>
				</Paper>
			</div>
		);
	}
}

export default withRouter(Navigation);
