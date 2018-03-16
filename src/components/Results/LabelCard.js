import React from 'react';
import { Card, CardText, CardHeader } from 'material-ui/Card';
import Paper from 'material-ui/Paper';
import './LabelCard.css';
import PropTypes from 'prop-types';

export default class LabelCard extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		if (this.props.active) {
			return (
				<Card className="toolTipcard">
					<Paper>
						<CardHeader
							title={this.props.payload[0].payload.label}
							className="header"
						/>
					</Paper>
					<CardText className="text">
						{this.props.payload[0].payload.text}
					</CardText>
				</Card>
			);
		}
		return null;
	}
}
