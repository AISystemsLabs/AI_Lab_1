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
		return (
			<Card className="toolTipcard">
				<Paper>
					<CardHeader title={this.props.label} className="header" />
				</Paper>
				<CardText className="text">{this.props.text}</CardText>
			</Card>
		);
	}
}
