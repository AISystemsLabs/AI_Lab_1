import React from 'react';
import * as auth from '../../firebase/auth';
import * as routes from '../../constants/routes';

import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import FontIcon from 'material-ui/FontIcon';
import CircularProgress from 'material-ui/CircularProgress';
import Snackbar from 'material-ui/Snackbar';

import './SignInForm.css';

const initialState = {
	email: '',
	passwordOne: '',
	error: null,
	isSignInLoading: false,
	isGoogleLoading: false,
	isFacebookLoading: false,
	isGithubLoading: false,
	isDone: false,
	isEmailTouched: false,
	isPasswordOneTouched: false,
};

const byPropKey = (propertyName, value) => () => ({
	[propertyName]: value,
});

export default class SignInForm extends React.Component {
	constructor(props) {
		super(props);
		this.state = { ...initialState };

		this.onGithubClick = this.onGithubClick.bind(this);
		this.onGoogleClick = this.onGoogleClick.bind(this);
		this.onFacebookClick = this.onFacebookClick.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
	}

	redirectToQuestions = () => {
		this.props.history.push('/questions/novice');
	};

	onSubmit = event => {
		this.setState({ isSignInLoading: true });

		const { email, passwordOne } = this.state;
		auth.loginWithEmail(email, passwordOne).subscribe(
			() => {
				this.setState({ ...initialState });
				this.setState({ isDone: true });
				this.setState({ isSignInLoading: false });
			},
			error => {
				this.setState(byPropKey('error', 'Некоректний логін чи пароль'));
				this.setState({ isSignInLoading: false });
			}
		);
		event.preventDefault();
	};

	onGoogleClick = event => {
		this.setState({ isGoogleLoading: true });
		auth.logInWithGoogle().subscribe(
			res => {
				this.setState({ ...initialState });
				this.setState({ isDone: true });
				this.setState({ isGoogleLoading: false });
			},
			error => {
				this.setState(byPropKey('error', error));
				this.setState({ isGoogleLoading: false });
			}
		);
		event.preventDefault();
	};

	onFacebookClick = () => {
		this.setState({ isFacebookLoading: true });
		auth.logInWithFacebook().subscribe(
			res => {
				this.setState({ ...initialState });
				this.setState({ isDone: true });
				this.setState({ isFacebookLoading: false });
			},
			error => {
				this.setState(byPropKey('error', error));
				this.setState({ isFacebookLoading: false });
			}
		);
	};

	onGithubClick = () => {
		this.setState({ isGithubLoading: true });
		auth.logInWithGithub().subscribe(
			res => {
				this.setState({ ...initialState });
				this.setState({ isDone: true });
				this.setState({ isGithubLoading: false });
			},
			error => {
				this.setState(byPropKey('error', error));
				this.setState({ isGithubLoading: false });
			}
		);
	};

	render() {
		const {
			email,
			passwordOne,
			error,
			isEmailTouched,
			isPasswordOneTouched,
		} = this.state;

		const isInvalid = passwordOne === '' || email === '';

		return (
			<div>
				<h3 style={{ textAlign: 'center' }}>Увійдіть</h3>
				<form onSubmit={this.onSubmit} className="signInForm">
					<TextField
						value={email}
						id="email"
						onChange={event => {
							this.setState(byPropKey('email', event.target.value));
							this.setState(byPropKey('isEmailTouched', true));
						}}
						type="text"
						floatingLabelText="Email адреса"
						className="input-field"
					/>

					<TextField
						value={passwordOne}
						id="passwordOne"
						onChange={event => {
							this.setState(byPropKey('passwordOne', event.target.value));
							this.setState(byPropKey('isPasswordOneTouched', true));
						}}
						type="password"
						floatingLabelText="Ваш пароль"
						className="input-field"
					/>

					{this.state.isSignInLoading ? (
						<CircularProgress />
					) : (
						<RaisedButton
							type="submit"
							disabled={isInvalid}
							primary={true}
							label="Увійти"
						/>
					)}

					{error && <p>{error.message}</p>}
				</form>
				<h3 style={{ textAlign: 'center' }}>Або увійдіть за допомогою</h3>
				<div className="socialButtons">
					{this.state.isGoogleLoading ? (
						<CircularProgress />
					) : (
						<RaisedButton
							label="Google"
							backgroundColor="#dd4b39"
							labelPosition="after"
							icon={<FontIcon className="ion-social-googleplus" />}
							onClick={this.onGoogleClick}
						/>
					)}

					{this.state.isFacebookLoading ? (
						<CircularProgress />
					) : (
						<RaisedButton
							label="Facebook"
							backgroundColor="#3b5998"
							labelPosition="after"
							icon={<FontIcon className="ion-social-facebook" />}
							onClick={this.onFacebookClick}
						/>
					)}

					{this.state.isGithubLoading ? (
						<CircularProgress />
					) : (
						<RaisedButton
							label="Github"
							labelPosition="after"
							icon={<FontIcon className="ion-social-github" />}
							onClick={this.onGithubClick}
						/>
					)}

					<Snackbar
						open={this.state.isDone}
						message="Ви успішно увійшли!"
						autoHideDuration={1000}
						onRequestClose={this.redirectToQuestions}
						style={{ bottom: '70px' }}
					/>
				</div>
			</div>
		);
	}
}
