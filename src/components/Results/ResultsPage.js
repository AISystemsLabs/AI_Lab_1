import React from 'react';
import { Card, CardText } from 'material-ui/Card';
import * as recharts from 'recharts';
import * as V from 'victory';
import * as firestore from '../../firebase/firestore';
import { texts } from './Texts';
import * as renderActiveShape from './renderActiveShape';
import PropTypes from 'prop-types';
import * as randomColors from 'randomcolor';

import withAuthorization from '../Helpers/WithAuthorization/withAuthorization';
import { withRouter } from 'react-router-dom';

import LabelCard from './LabelCard';
import './ResultsPage.css';

class ResultsPage extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			data: [],
			colors: texts.map(x => {
				return { id: x.id, color: randomColors({ luminosity: 'bright' }) };
			}),
		};
		this.waitForUser = this.waitForUser.bind(this);
		this.onPieEnter = this.onPieEnter.bind(this);
		this.getColorById = this.getColorById.bind(this);
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
							ukrLabel: x.ukrHeader,
							card: <LabelCard header={x.header} text={x.description} />,
							value: points,
							fill: this.getColorById(x.id),
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

	onPieEnter(data, index) {
		this.setState({
			activeIndex: index,
		});
	}

	getColorById(id) {
		let temp = this.state.colors.find(y => y.id == id).color;
		return temp;
	}

	render() {
		return (
			<Card className="mainCard">
				<CardText>
					{/* <recharts.PieChart width={500} height={486}>
            <recharts.Pie paddingAngle={0} outerRadius="50%" labelLine={false} data={this.state.data} dataKey="value" nameKey="label" cx="50%" cy="50%" activeShape={renderActiveShape.renderActiveShape} legendType="circle" activeIndex={this.state.activeIndex} onMouseEnter={this.onPieEnter} label={true} />
            {this.state.data.map((x, index) => (
              <recharts.Cell key={index} fill={this.getColorById(x.id)} />
            ))}

            <recharts.Legend verticalAlign="top" layout="vertical" verticalAlign="bottom" />

            <recharts.Tooltip content={<LabelCard />} />
          </recharts.PieChart> */}
					<V.VictoryPie
						data={this.state.data}
						x="ukrLabel"
						y="value"
						cornerRadius={50}
						theme={V.VictoryTheme.material}
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
