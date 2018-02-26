import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import SignInForm from './SignInForm';
import SignUpLink from '../SignUp/SignUpLink';

import './SignIn.css';

import {
	Card,
	CardActions,
	CardHeader,
	CardMedia,
	CardTitle,
	CardText,
} from 'material-ui/Card';

class SignIn extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div className="cardContainer">
				<Card className="card">
					<CardHeader className="cardheader" title="Увійдіть" />
					<CardText>
						<SignInForm history={this.props.history} />
					</CardText>
					<SignUpLink />
				</Card>
			</div>
		);
	}
}

export default withRouter(SignIn);
