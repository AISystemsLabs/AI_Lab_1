import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import * as auth from '../firebase/auth';
import * as routes from '../constants/routes';

class Landing extends Component {
	constructor(props) {
		super(props);
	}

	componentDidMount() {
		if (auth.isLoggedIn()) {
			this.props.history.push('/questions/novice');
		} else {
			this.props.history.push(routes.SIGN_IN);
		}
	}

	render() {
		return <div>Hi, i`m Landing!</div>;
	}
}

export default withRouter(Landing);
