import React from 'react';
import { withRouter } from 'react-router-dom';

import { Card, CardTitle, CardText } from 'material-ui/Card';

import * as firestore from '../../firebase/firestore';
import withAuthorization from '../Helpers/WithAuthorization/withAuthorization';
import withAuthentication from '../Helpers/WithAuthentication/withAuthentication';
import PropTypes from 'prop-types';
import { timestamp } from 'rxjs/operators';

import NoviceForm from './Forms/NoviceForm';

class QuestionsPage extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			answers: [],
			form: <div />,
		};
	}

	waitForUser() {
		if (this.context.authUser == null) {
			setTimeout(() => this.waitForUser(), 200);
		} else {
			console.log(new Date());

			firestore
				.getAnswersPerLevel('novice', this.context.authUser)
				.subscribe(x => {
					this.setState({
						answers: x,
					});
					if (this.props.match.url == '/questions/novice') {
						this.setState({
							form: <NoviceForm answers={this.state.answers} />,
						});
					}
					console.log(new Date());
				});
		}
	}

	componentDidMount = () => {
		console.log(new Date());
		this.waitForUser();
	};

	render() {
		const form = this.state.form;
		return (
			<div>
				<Card>
					<CardText>{form}</CardText>
				</Card>
			</div>
		);
	}
}

QuestionsPage.contextTypes = {
	authUser: PropTypes.object,
};

const authCondition = authUser => !!authUser;

export default withAuthorization(authCondition)(withRouter(QuestionsPage));
