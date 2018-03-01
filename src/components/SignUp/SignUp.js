import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import SignUpForm from './SignUpForm';
import SignInLink from '../SignIn/SignInLink';

import './SignUp.css';

import {
	Card,
	CardActions,
	CardHeader,
	CardMedia,
	CardTitle,
	CardText,
} from 'material-ui/Card';

class SignUp extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div className="cardContainer">
				<Card className="card">
					<CardHeader className="cardheader" title="Реєстрація" />
					<CardText>
						<SignUpForm history={this.props.history} />
					</CardText>
					<SignInLink />
				</Card>
			</div>
		);
	}
}

export default withRouter(SignUp);
