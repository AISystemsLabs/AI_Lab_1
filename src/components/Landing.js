import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

import * as routes from '../constants/routes';

class Landing extends Component {
	componentDidMount() {
		if (this.context.authUser != null) {
			this.props.history.push('/questions/novice');
		} else {
			this.props.history.push(routes.SIGN_IN);
		}
	}

	render() {
		return (
			<div>
				Hi, i`m Landing! If you see this then something is going very, very,
				veeery wrong. That`s so sad. Please contact me on{' '}
				<a href="mailto:makoveychukvitaliy@gmail.com">this mail</a>
			</div>
		);
	}
}

Landing.contextTypes = {
	authUser: PropTypes.object,
};

export default withRouter(Landing);
