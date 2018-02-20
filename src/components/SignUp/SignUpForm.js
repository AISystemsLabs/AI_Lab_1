import React from "react";
import * as auth from "../../firebase/auth";
import * as routes from "../../constants/routes";

import TextField from "material-ui/TextField";
import RaisedButton from "material-ui/RaisedButton";
import FontIcon from "material-ui/FontIcon";
import CircularProgress from "material-ui/CircularProgress";
import Snackbar from 'material-ui/Snackbar';

import "./SignUpForm.css";

const initialState = {
  email: "",
  passwordOne: "",
  passwordTwo: "",
  error: null,
  isSignUpLoading :false,
  isDone:false
};

const byPropKey = (propertyName, value) => () => ({
  [propertyName]: value
});

export default class SignUpForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { ...initialState };
  }


  onSubmit = event => {
    this.setState({isSignUpLoading:true});
    
    const { email, passwordOne } = this.state;
    auth.registerWithEmail(email, passwordOne).subscribe(
      () => {
        this.setState({ ...initialState });
        this.setState({isDone: true})
        this.props.history.push(routes.Questions);
      },
      error => {
        this.setState({isSignUpLoading:false});
        this.setState(byPropKey("error", error));
      }
    );

    event.preventDefault();
  };

  onGoogleClick = () => {
    auth.registerWithGoogle().subscribe(
      res => {
        console.log(res.user);
        console.log(res.credential);
        this.setState({ ...initialState });
        this.setState({isDone: true})
      //  this.props.history.push(routes.Questions);
      },
      error => {
        this.setState(byPropKey("error", error));
      }
    );
  };

  onFacebookClick = () => {
    auth.registerWithFacebook().subscribe(
      res => {
        console.log(res);
        this.setState({ ...initialState });
        this.setState({isDone: true})
        this.props.history.push(routes.Questions);
      },
      error => {
        this.setState(byPropKey("error", error));
      }
    );
  };

  onGithubClick = () => {
    auth.registerWithGithub().subscribe(
      res => {
        console.log(res);
        this.setState({ ...initialState });
        this.setState({isDone: true})
        this.props.history.push(routes.Questions);
      },
      error => {
        this.setState(byPropKey("error", error));
      }
    );
  };

  render() {
    const { email, passwordOne, passwordTwo, error } = this.state;

    const isInvalid =
      passwordOne !== passwordTwo || passwordOne === "" || email === "";

    return (
      <div>
        <h3 style={{ textAlign: "center" }}>Зареєструйтеся</h3>
        <form onSubmit={this.onSubmit} className="signUpForm">
          <TextField
            value={email}
            id="email"
            onChange={event =>
              this.setState(byPropKey("email", event.target.value))
            }
            type="text"
            floatingLabelText="Email адреса"
            className="input-field"
          />

          <TextField
            value={passwordOne}
            id="passwordOne"
            onChange={event =>
              this.setState(byPropKey("passwordOne", event.target.value))
            }
            type="password"
            floatingLabelText="Ваш пароль"
            className="input-field"
          />

          <TextField
            value={passwordTwo}
            id="passwordTwo"
            onChange={event =>
              this.setState(byPropKey("passwordTwo", event.target.value))
            }
            type="password"
            floatingLabelText="Підтвердьте пароль"
            className="input-field"
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
        <h3 style={{ textAlign: "center" }}>Або увійдіть за допомогою</h3>
        <div className="socialButtons">
          <RaisedButton
            label="Google"
            backgroundColor="#dd4b39"
            labelPosition="after"
            icon={<FontIcon className="ion-social-googleplus" />}
            onClick={this.onGoogleClick}
          />

          <RaisedButton
            label="Facebook"
            backgroundColor="#3b5998"
            labelPosition="after"
            icon={<FontIcon className="ion-social-facebook" />}
            onClick={this.onFacebookClick}
          />

          <RaisedButton
            label="Github"
            labelPosition="after"
            icon={<FontIcon className="ion-social-github" />}
            onClick={this.onGithubClick}
          />

           <Snackbar
          open={true}
          message="Event added to your calendar"
          autoHideDuration={4000}
          onRequestClose={this.handleRequestClose}
        />
        </div>

        
      </div>
    );
  }
}
