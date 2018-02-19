import React from 'react';

import * as routes from '../../constants/routes';
import * as auth from '../../firebase/auth';

const initial_state = {
    Email: '',
    Password: '',
    Error: ''
};

const byPropKey = (propertyName, value) => () => ({
    [propertyName]: value,
});

export default class SignInForm extends React.Component {


    constructor(props) {
        super(props);
        this.state = {...initial_state};
    }

    onSubmit() {
        let {email, password} = this.state;
        auth.loginWithEmail(email, password).subscribe(
            () => {
                this.setState({...initial_state});
                this.props.history.push(routes.HOME);
            },
            error => {
                this.setState(byPropKey("error", error))
            });
    }

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
        const {email, password} = this.state;

        const isInvalid = email === '' || password === '';

        return (
            <div>
                <form onSubmit={this.onSubmit}>
                    <input
                        value={email}
                        onChange={event => this.setState(byPropKey('email', event.target.value))}
                        type="text"
                        placeholder="Email адреса"/>

                    <input
                        value={password}
                        onChange={event => this.setState(byPropKey('passwordOne', event.target.value))}
                        type="password"
                        placeholder="Ваш пароль"/>

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