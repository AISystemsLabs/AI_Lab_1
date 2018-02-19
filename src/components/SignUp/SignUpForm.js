import React from 'react';
import * as auth from '../../firebase/auth'
import * as routes from '../../constants/routes'

import './SignUpForm.css'


const initialState = {
    email: '',
    passwordOne: '',
    passwordTwo: '',
    error: null,
};

const byPropKey = (propertyName, value) => () => ({
    [propertyName]: value,
});

export default class SignUpForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {...initialState}
    };

    onSubmit = (event) => {
        const {
            email,
            passwordOne
        } = this.state;
        auth.registerWithEmail(email, passwordOne).subscribe(
            () => {
                this.setState({...initialState});
                this.props.history.push(routes.HOME);
            },
            error => {
                this.setState(byPropKey("error", error))
            });

        event.preventDefault();
    };

    onGoogleClick = () => {
        auth.registerWithGoogle().subscribe(
            res => {
                console.log(res.user);
                console.log(res.credential);
                this.setState({...initialState});
                this.props.history.push(routes.HOME);
            },
            error => {
                this.setState(byPropKey("error", error))
            })
    };

    render() {
        const {
            email,
            passwordOne,
            passwordTwo,
            error,
        } = this.state;

        const isInvalid =
            passwordOne !== passwordTwo ||
            passwordOne === '' ||
            email === '';

        return (
            <div>
            <form onSubmit={this.onSubmit}>
                <input
                    value={email}
                    onChange={event => this.setState(byPropKey('email', event.target.value))}
                    type="text"
                    placeholder="Email адреса"/>

                <input
                    value={passwordOne}
                    onChange={event => this.setState(byPropKey('passwordOne', event.target.value))}
                    type="password"
                    placeholder="Ваш пароль"/>

                <input
                    value={passwordTwo}
                    onChange={event => this.setState(byPropKey('passwordTwo', event.target.value))}
                    type="password"
                    placeholder="Підтвердьте пароль"/>
                <button type="submit" disabled={isInvalid}>
                    Зареєструватися
                </button>

                {error && <p>{error.message}</p>}
            </form>
            <button className="google-sign-in" onClick={this.onGoogleClick}/>
            </div>
        )
    }
}
