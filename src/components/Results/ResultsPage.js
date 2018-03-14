import React from 'react';
import { Card, CardText } from 'material-ui/Card';
import * as recharts from 'recharts';
import * as firestore from '../../firebase/firestore';
import { texts } from './Texts';
import PropTypes from 'prop-types';

import withAuthorization from '../Helpers/WithAuthorization/withAuthorization';
import { withRouter } from 'react-router-dom';

import LabelCard from './LabelCard';
import './ResultsPage.css';

const renderActiveShape = props => {
	const RADIAN = Math.PI / 180;
	const {
		cx,
		cy,
		midAngle,
		innerRadius,
		outerRadius,
		startAngle,
		endAngle,
		fill,
		payload,
		percent,
		value,
	} = props;
	const sin = Math.sin(-RADIAN * midAngle);
	const cos = Math.cos(-RADIAN * midAngle);
	const sx = cx + (outerRadius + 10) * cos;
	const sy = cy + (outerRadius + 10) * sin;
	const mx = cx + (outerRadius + 30) * cos;
	const my = cy + (outerRadius + 30) * sin;
	const ex = mx + (cos >= 0 ? 1 : -1) * 22;
	const ey = my;
	const textAnchor = cos >= 0 ? 'start' : 'end';

	return (
		<g>
			<text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill}>
				{payload.name}
			</text>
			<recharts.Sector
				cx={cx}
				cy={cy}
				innerRadius={innerRadius}
				outerRadius={outerRadius}
				startAngle={startAngle}
				endAngle={endAngle}
				fill={fill}
			/>
			<recharts.Sector
				cx={cx}
				cy={cy}
				startAngle={startAngle}
				endAngle={endAngle}
				innerRadius={outerRadius + 6}
				outerRadius={outerRadius + 10}
				fill={fill}
			/>
			<path
				d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`}
				stroke={fill}
				fill="none"
			/>
			<circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
			<text
				x={ex + (cos >= 0 ? 1 : -1) * 12}
				y={ey}
				textAnchor={textAnchor}
				fill="#333"
			>{`PV ${value}`}</text>
			<text
				x={ex + (cos >= 0 ? 1 : -1) * 12}
				y={ey}
				dy={18}
				textAnchor={textAnchor}
				fill="#999"
			>
				{`(Rate ${(percent * 100).toFixed(2)}%)`}
			</text>
		</g>
	);
};

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
		this.onPieEnter = this.onPieEnter.bind(this);
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

	onPieEnter(data, index) {
		this.setState({
			activeIndex: index,
		});
	}

	render() {
		return (
			<Card className="mainCard">
				<CardText>
					<recharts.ResponsiveContainer width={450} height={450}>
						<recharts.PieChart width={450} height={450}>
							<recharts.Pie
								paddingAngle={10}
								labelLine={false}
								data={this.state.data}
								dataKey="value"
								nameKey="label"
								cx="50%"
								cy="50%"
								activeShape={renderActiveShape}
								activeIndex={this.state.activeIndex}
								onMouseEnter={this.onPieEnter}
								label={true}
							/>
						</recharts.PieChart>
					</recharts.ResponsiveContainer>
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
