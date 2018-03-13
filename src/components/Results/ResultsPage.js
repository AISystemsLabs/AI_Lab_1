import React from 'react';
import { Card, CardText } from 'material-ui/Card';
import { Pie } from '@nivo/pie';
import { TooltipFormat } from '@nivo/tooltips';
import * as firestore from '../../firebase/firestore';
import { texts } from './Texts';
import PropTypes from 'prop-types';

import withAuthorization from '../Helpers/WithAuthorization/withAuthorization';
import { withRouter } from 'react-router-dom';

import LabelCard from './LabelCard';
import './ResultsPage.css';

class ResultsPage extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			data: [
				{
					id: 'loading',
					value: 0,
					label: 'loading',
				},
			],
		};
		this.waitForUser = this.waitForUser.bind(this);
	}

	componentDidMount = () => {
		this.waitForUser();
	};

	waitForUser() {
		if (this.context.authUser == null) {
			setTimeout(() => this.waitForUser(), 200);
		} else {
			this.setData();
		}
	}

	setData() {
		firestore
			.getRef(this.context.authUser)
			.get()
			.then(doc => {
				let data = doc.data();
				this.setState({
					data: texts.map(x => {
						let marks = data[x.id];
						let points = this.calculatePoints(marks, x);
						return {
							id: x.id,
							label: x.header,
							card: <LabelCard header={x.header} text={x.description} />,
							value: points,
						};
					}),
				});
			});
	}

	calculatePoints(marks, text) {
		let sum = 0;
		marks.forEach((x, index, marks) => {
			sum += text.points[index][x];
		});
		return sum;
	}

	render() {
		return (
			<Card className="mainCard">
				<CardText>
					<Pie
						tooltipFormat={e => console.log(e)}
						data={this.state.data}
						width={450}
						height={450}
						margin={{
							top: 0,
							right: 0,
							bottom: 40,
							left: 0,
						}}
						innerRadius={0.5}
						padAngle={0.7}
						cornerRadius={3}
						colors="d320c"
						colorBy="id"
						borderColor="inherit:darker(0.6)"
						radialLabel={e => {
							'';
						}}
						radialLabelsSkipAngle={10}
						radialLabelsTextXOffset={0}
						radialLabelsTextColor="#333333"
						radialLabelsLinkOffset={-100}
						radialLabelsLinkDiagonalLength={0}
						radialLabelsLinkHorizontalLength={0}
						radialLabelsLinkStrokeWidth={1}
						radialLabelsLinkColor="inherit"
						slicesLabelsSkipAngle={10}
						slicesLabelsTextColor="#333333"
						animate={true}
						motionStiffness={90}
						motionDamping={15}
						legends={[
							{
								anchor: 'bottom',
								direction: 'row',
								itemDirection: 'top-to-bottom',
								translateY: 56,
								itemWidth: 100,
								itemHeight: 30,
								symbolSize: 14,
								symbolShape: 'square',
								item: 'id',
							},
						]}
					/>
				</CardText>
			</Card>
		);
	}
}

ResultsPage.contextTypes = {
	authUser: PropTypes.object,
};

const authCondition = authUser => !!authUser;

export default withAuthorization(authCondition)(withRouter(ResultsPage));
