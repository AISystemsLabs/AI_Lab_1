import React from 'react';
import { withRouter } from 'react-router-dom';

import { Card, CardTitle, CardText } from 'material-ui/Card';

import * as firestore from '../../firebase/firestore';

class QuestionsPage extends React.Component {
	constructor(props) {
		super(props);
		firestore.getAnswersPerLevel('email').subscribe(x => {
			console.log(x);
		});
	}

	render() {
		return (
			<div>
				<Card />
			</div>
		);
	}
}

export default withRouter(QuestionsPage);
