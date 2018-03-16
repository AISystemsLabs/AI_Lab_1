import React from 'react';
import { Card, CardText, CardHeader } from 'material-ui/Card';
import Paper from 'material-ui/Paper';
import './LabelCard.css';
import PropTypes from 'prop-types';

export default class LabelCard extends React.Component {
	constructor(props) {
		super(props);
	}

	static propTypes = {
		type: PropTypes.string,
		payload: PropTypes.array,
		label: PropTypes.string,
	};

	render() {
		if (this.props.active) {
			return (
				<Card className="toolTipcard">
					<Paper>
						<CardHeader
							title={this.props.payload[0].header}
							className="header"
						/>
					</Paper>
					<CardText className="text">{this.props.paylaod[0].text}</CardText>
				</Card>
			);
		}
		return null;
	}
}
