import React from 'react';
import { Card, CardText } from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import * as recharts from 'recharts';
import * as firestore from '../../firebase/firestore';
import { texts } from './Texts';
import * as renderActiveShape from './renderActiveShape';
import Popup from 'reactjs-popup';
import PropTypes from 'prop-types';
import Confetti from 'react-dom-confetti';
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
			levelData: [],
			tooltip: <div />,
			isTooltipActive: false,
			tooltipX: 0,
			tooltipY: 0,
			popupActive: true,
			colors: texts.map(x => {
				return { id: x.id, color: randomColors({ luminosity: 'bright' }) };
			}),
		};
		this.waitForUser = this.waitForUser.bind(this);
		this.onPieEnter = this.onPieEnter.bind(this);
		this.getColorById = this.getColorById.bind(this);
		this.setLevelData = this.setLevelData.bind(this);
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
				this.setState(
					{
						data: texts.map(x => {
							let marks = data[x.id];
							let points = this.calculatePoints(marks, x);
							return {
								id: x.id,
								label: x.header,
								ukrLabel: x.ukrHeader,
								text: x.description,
								value: points,
								fill: this.getColorById(x.id),
							};
						}),
					},
					() => {
						this.setState({
							level: this.state.data.sort((a, b) => a.value < b.value)[0]
								.ukrLabel,
						});
					}
				);
			});
	}

	setLevelData(levelIndex) {
		firestore
			.getRef(this.context.authUser)
			.get()
			.then(doc => {
				let data = doc.data();
				let marks = data[texts[levelIndex].id];
				this.setState({
					levelData: marks.map((x, index) => {
						return {
							id: texts[levelIndex].id + index,
							label: index + 1,
							value: texts[levelIndex].points[index][x],
							fill: this.getColorById(texts[levelIndex].id),
						};
					}),
					card: (
						<LabelCard
							label={texts[levelIndex].header}
							text={texts[levelIndex].description}
						/>
					),
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

	onPieEnter(data, index, e) {
		this.setState({
			activeIndex: index,
		});
		this.setLevelData(index);
	}

	getColorById(id) {
		let temp = this.state.colors.find(y => y.id == id).color;
		return temp;
	}

	closePopup() {
		this.setState({ confettiActive: true });
		setTimeout(() => {
			this.setState({ popupActive: false });
		}, 1000);
	}

	render() {
		const config = {
			angle: 90,
			spread: 89,
			startVelocity: 20,
			elementCount: 200,
			decay: 0.95,
		};

		return (
			<div className="resultsContainer">
				<Popup open={this.state.popupActive}>
					<div
						style={{
							display: 'flex',
							flexDirection: 'row',
							justifyContent: 'center',
						}}
					>
						<Confetti
							style={{ zIndex: '10000' }}
							active={this.state.confettiActive}
							config={config}
						/>
						<h3>Вітаємо, ви</h3>
						<Confetti
							style={{ zIndex: '10000' }}
							active={this.state.confettiActive}
							config={config}
						/>
					</div>
					<h1 style={{ textAlign: 'center' }}>{this.state.level}</h1>
					<div
						style={{
							display: 'flex',
							flexDirection: 'row',
							justifyContent: 'center',
						}}
					>
						<RaisedButton onClick={() => this.closePopup()}>Ok</RaisedButton>
						<Confetti
							style={{ zIndex: '10000' }}
							active={this.state.confettiActive}
							config={config}
						/>
					</div>
				</Popup>

				<Card className="mainCard">
					<CardText>
						<recharts.PieChart width={500} height={486}>
							<recharts.Pie
								paddingAngle={0}
								outerRadius="50%"
								labelLine={false}
								data={this.state.data}
								dataKey="value"
								nameKey="label"
								cx="50%"
								cy="50%"
								activeShape={renderActiveShape.renderActiveShape}
								activeIndex={this.state.activeIndex}
								legendType="circle"
								label={true}
								onMouseOver={this.onPieEnter}
							/>
							{this.state.data.map((x, index) => (
								<recharts.Cell key={index} fill={this.getColorById(x.id)} />
							))}

							<recharts.Legend layout="vertical" verticalAlign="bottom" />
						</recharts.PieChart>
					</CardText>
				</Card>
				<Card className="mainCard">
					<CardText>
						<recharts.BarChart
							width={500}
							height={243}
							data={this.state.levelData}
						>
							<recharts.Bar
								dataKey="value"
								nameKey="label"
								legendType="circle"
							/>
							<recharts.CartesianGrid strokeDasharray="3 3" />
							<recharts.XAxis dataKey="label" />
							<recharts.YAxis />
							<recharts.Tooltip />
						</recharts.BarChart>
						{this.state.card}
					</CardText>
				</Card>
			</div>
		);
	}
}

ResultsPage.contextTypes = {
	authUser: PropTypes.object,
};

const authCondition = authUser => !!authUser;

export default withAuthorization(authCondition)(withRouter(ResultsPage));
