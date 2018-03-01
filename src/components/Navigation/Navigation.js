import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import Paper from 'material-ui/Paper';
import FontIcon from 'material-ui/FontIcon';
import {
	BottomNavigation,
	BottomNavigationItem,
} from 'material-ui/BottomNavigation';
import PropTypes from 'prop-types';

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

	render() {
		const isLoggedIn = this.context.authUser != null;
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
								this.props.history.push('/questions/novice');
							}}
						/>
						<BottomNavigationItem
							label="Результати"
							icon={resultsIcon}
							onClick={() => this.props.history.push(routes.Results)}
						/>
						{!isLoggedIn && (
							<BottomNavigationItem
								label="Увійти"
								icon={signInIcon}
								onClick={() => this.props.history.push(routes.SIGN_IN)}
							/>
						)}
						{!isLoggedIn && (
							<BottomNavigationItem
								label="Реєстрація"
								icon={signUpIcon}
								onClick={() => this.props.history.push(routes.SIGN_UP)}
							/>
						)}
						{isLoggedIn && (
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

Navigation.contextTypes = {
	authUser: PropTypes.object,
};

export default withRouter(Navigation);
