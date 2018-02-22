import React from 'react';
import * as auth from '../../firebase/auth';
import * as routes from '../../constants/routes';
import PasswordHelper from './PasswordHelper';

import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import FontIcon from 'material-ui/FontIcon';
import CircularProgress from 'material-ui/CircularProgress';
import Snackbar from 'material-ui/Snackbar';
import Popover from 'material-ui/Popover';

import './SignUpForm.css';

const initialState = {
	email: '',
	passwordOne: '',
	passwordTwo: '',
	error: null,
	isSignUpLoading: false,
	isGoogleLoading: false,
	isFacebookLoading: false,
	isGithubLoading: false,
	isDone: false,
	isEmailTouched: false,
	isPasswordOneTouched: false,
	isPasswordTwoTouched: false,
	showHelper: false,
	helperAnchor: null,
};

const byPropKey = (propertyName, value) => () => ({
	[propertyName]: value,
});

export default class SignUpForm extends React.Component {
	constructor(props) {
		super(props);
		this.state = { ...initialState };
	}

	redirectToQuestions = () => {
		this.props.history.push(routes.Questions);
	};

	onSubmit = event => {
		this.setState({ isSignUpLoading: true });

		const { email, passwordOne } = this.state;
		auth.registerWithEmail(email, passwordOne).subscribe(
			() => {
				this.setState({ ...initialState });
				this.setState({ isDone: true });
			},
			error => {
				this.setState(byPropKey('error', error));
			}
		);
		this.setState({ isSignUpLoading: false });
		event.preventDefault();
	};

	onGoogleClick = () => {
		this.setState({ isGoogleLoading: true });
		auth.registerWithGoogle().subscribe(
			res => {
				console.log(res.user);
				console.log(res.credential);
				this.setState({ ...initialState });
				this.setState({ isDone: true });
			},
			error => {
				this.setState(byPropKey('error', error));
			}
		);
		this.setState({ isGoogleLoading: false });
	};

	onFacebookClick = () => {
		this.setState({ isFacebookLoading: true });
		auth.registerWithFacebook().subscribe(
			res => {
				console.log(res);
				this.setState({ ...initialState });
				this.setState({ isDone: true });
			},
			error => {
				this.setState(byPropKey('error', error));
			}
		);
		this.setState({ isFacebookLoading: false });
	};

	onGithubClick = () => {
		this.setState({ isGithubLoading: true });
		auth.registerWithGithub().subscribe(
			res => {
				this.setState({ ...initialState });
				this.setState({ isDone: true });
			},
			error => {
				this.setState(byPropKey('error', error));
			}
		);
		this.setState({ isGithubLoading: false });
	};

	render() {
		const {
			email,
			passwordOne,
			passwordTwo,
			error,
			isEmailTouched,
			isPasswordOneTouched,
			isPasswordTwoTouched,
		} = this.state;

		const isEmailValid = !isEmailTouched || /.+@.+\..+/i.test(email);
		const isPasswordOneLength = passwordOne.length >= 6;
		const isPasswordOneLetter = /[a-zA-z]/.test(passwordOne);
		const isPasswordOneNumber = /[0-9]/.test(passwordOne);
		const isPasswordOneValid =
			isPasswordOneTouched &&
			isPasswordOneLength &&
			isPasswordOneLetter &&
			isPasswordOneNumber;

		const isPasswordTwoEqual = passwordOne === passwordTwo;
		const isPasswordTwoLength = passwordTwo.length >= 6;
		const isPasswordTwoLetter = /[a-zA-z]/.test(passwordTwo);
		const isPasswordTwoNumber = /[0-9]/.test(passwordTwo);
		const isPasswordTwoValid =
			isPasswordTwoTouched &&
			isPasswordTwoLength &&
			isPasswordTwoLetter &&
			isPasswordTwoNumber &&
			isPasswordTwoEqual;

		const isInvalid =
			!isPasswordOneValid ||
			!isPasswordTwoValid ||
			!isEmailValid ||
			email === '';

		return (
			<div>
				<h3 style={{ textAlign: 'center' }}>Зареєструйтеся</h3>
				<form onSubmit={this.onSubmit} className="signUpForm">
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
						errorText={!isEmailValid && 'Адреса не коректна'}
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
						errorText={
							!isPasswordOneTouched
								? ''
								: !isPasswordOneLength
									? 'Пароль має містити мінімум 6 символів'
									: !isPasswordOneLetter
										? 'Пароль має містити хоча б одну літеру'
										: !isPasswordOneNumber
											? 'Пароль має містити хоча б одну цифру'
											: ''
						}
						onFocus={event => {
							this.setState({
								showHelper: true,
								helperAnchor: event.currentTarget,
							});
						}}
						onBlur={() => this.setState({ showHelper: false })}
					/>

					<TextField
						value={passwordTwo}
						id="passwordTwo"
						onChange={event => {
							this.setState(byPropKey('passwordTwo', event.target.value));
							this.setState(byPropKey('isPasswordTwoTouched', true));
						}}
						type="password"
						floatingLabelText="Підтвердьте пароль"
						className="input-field"
						errorText={
							!isPasswordTwoTouched
								? ''
								: !isPasswordTwoEqual
									? 'Паролі повинні збігатися'
									: !isPasswordTwoLength
										? 'Пароль має містити мінімум 6 символів'
										: !isPasswordTwoLetter
											? 'Пароль має містити хоча б одну літеру'
											: !isPasswordTwoNumber
												? 'Пароль має містити хоча б одну цифру'
												: ''
						}
					/>

					{this.state.isSignUpLoading ? (
						<CircularProgress />
					) : (
						<RaisedButton
							type="submit"
							disabled={isInvalid}
							primary={true}
							label="Зареєструватися"
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
						message="Реєстрація успішна!"
						autoHideDuration={1000}
						onRequestClose={this.redirectToQuestions}
						style={{ bottom: '56px' }}
					/>

					<Popover
						open={this.state.showHelper}
						anchorEl={this.state.helperAnchor}
						anchorOrigin={{ horizontal: 'right', vertical: 'center' }}
						targetOrigin={{ horizontal: 'left', vertical: 'center' }}
						canAutoPosition={true}
					>
						<PasswordHelper
							IsLengthOk={isPasswordOneLength}
							IsLetter={isPasswordOneLetter}
							IsNumber={isPasswordOneNumber}
						/>
					</Popover>
				</div>
			</div>
		);
	}
}
