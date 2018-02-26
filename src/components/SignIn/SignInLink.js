import React from 'react';
import { Link } from 'react-router-dom';

import * as routes from '../../constants/routes';

class SignInLink extends React.Component {
	render() {
		return (
			<p>
				Вже маєте акаунт? <Link to={routes.SIGN_IN}>Увійдіть</Link>
			</p>
		);
	}
}

export default SignInLink;
