import React from 'react';
import { withRouter } from 'react-router-dom';

import { Card, CardTitle, CardText } from 'material-ui/Card';
import { Stepper, Step, StepButton } from 'material-ui/Stepper';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';

import * as firestore from '../../firebase/firestore';
import withAuthorization from '../Helpers/WithAuthorization/withAuthorization';
import PropTypes from 'prop-types';

import NoviceForm from './Forms/NoviceForm';
import BeginnerForm from './Forms/BeginerForm';
import CompetentForm from './Forms/CompetentForm';
import ProficientForm from './Forms/ProficientForm';
import ExpertForm from './Forms/ExpertForm';

import './Questions.css';

const levelUris = [
	'novice',
	'beginner',
	'competent',
	'proficient',
	'expert',
	'/results',
];

class QuestionsPage extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			answers: [],
			level: '',
			header: '',
			noviceDone: false,
			beginnerDone: false,
			competentDone: false,
			proficientDone: false,
			expertDone: false,
		};

		this.waitForUser = this.waitForUser.bind(this);
		this.handlePrev = this.handlePrev.bind(this);
		this.handleNext = this.handleNext.bind(this);
	}

	componentDidMount() {
		console.log(new Date());
		this.waitForUser();
	}

	handlePrev() {
		var level = levelUris[levelUris.indexOf(this.state.level) - 1];
		this.setStateForLevel(level);
		this.props.history.push('/questions/' + level);
	}

	handleNext() {
		var level = levelUris[levelUris.indexOf(this.state.level) + 1];
		if (level !== '/results') {
			this.setStateForLevel(level);
			this.props.history.push('/questions/' + level);
		} else {
			this.props.history.push(level);
		}
	}

	waitForUser() {
		if (this.context.authUser == null) {
			setTimeout(() => this.waitForUser(), 200);
		} else {
			this.setStateForLevel(this.props.match.url.split('/').pop());
			firestore.getRef(this.context.authUser).onSnapshot(doc => {
				this.setState({
					noviceDone: doc.data()['novice'].every(x => x > -1),
					beginnerDone: doc.data()['beginner'].every(x => x > -1),
					competentDone: doc.data()['competent'].every(x => x > -1),
					proficientDone: doc.data()['proficient'].every(x => x > -1),
					expertDone: doc.data()['expert'].every(x => x > -1),
					answers: doc.data()[this.state.level],
				});
			});
		}
	}

	setStateForLevel(level) {
		this.setState(
			{
				level: level,
			},
			() =>
				firestore
					.getAnswersPerLevel(this.state.level, this.context.authUser)
					.subscribe(x => {
						this.setState({
							answers: x,
						});
						this.setState({
							header:
								this.state.level === 'novice'
									? 'Новачок'
									: this.state.level === 'beginner'
										? 'Твердий початківець'
										: this.state.level === 'competent'
											? 'Компетентний'
											: this.state.level === 'proficient'
												? 'Досвідчений'
												: this.state.level === 'expert' ? 'Експерт' : '',
						});
					})
		);
	}

	getForm(level, answers) {
		switch (level) {
			case 'novice':
				return <NoviceForm answers={answers} />;
				break;
			case 'beginner':
				return <BeginnerForm answers={answers} />;
				break;
			case 'competent':
				return <CompetentForm answers={answers} />;
				break;
			case 'proficient':
				return <ProficientForm answers={answers} />;
				break;
			case 'expert':
				return <ExpertForm answers={answers} />;
				break;
		}
	}

	render() {
		return (
			<div className="cardContainer">
				<Card className="Card">
					<CardTitle className="cardheader" title={this.state.header} />
					<CardText>
						{this.getForm(this.state.level, this.state.answers)}

						<Stepper linear={false} orienation="horizontal">
							<Step
								completed={this.state.noviceDone}
								active={this.state.level === 'novice'}
							>
								<StepButton
									onClick={() => {
										this.setStateForLevel('novice');
										this.props.history.push('/questions/novice');
									}}
								>
									Новачок
								</StepButton>
							</Step>

							<Step
								completed={this.state.beginnerDone}
								active={this.state.level === 'beginner'}
							>
								<StepButton
									onClick={() => {
										this.props.history.push('/questions/beginner');
										this.setStateForLevel('beginner');
									}}
								>
									Твердий початківець
								</StepButton>
							</Step>

							<Step
								completed={this.state.competentDone}
								active={this.state.level === 'competent'}
							>
								<StepButton
									onClick={() => {
										this.props.history.push('/questions/competent');
										this.setStateForLevel('competent');
									}}
								>
									Компетентний
								</StepButton>
							</Step>

							<Step
								completed={this.state.proficientDone}
								active={this.state.level === 'proficient'}
							>
								<StepButton
									onClick={() => {
										this.props.history.push('/questions/proficient');
										this.setStateForLevel('proficient');
									}}
								>
									Досвідчений
								</StepButton>
							</Step>

							<Step
								completed={this.state.expertDone}
								active={this.state.level === 'expert'}
							>
								<StepButton
									onClick={() => {
										this.props.history.push('/questions/expert');
										this.setStateForLevel('expert');
									}}
								>
									Експерт
								</StepButton>
							</Step>
						</Stepper>
						<div className="actions">
							<FlatButton
								label="Назад"
								disabled={this.state.level === 'novice'}
								onClick={this.handlePrev}
							/>
							<RaisedButton
								label={this.state.level !== 'expert' ? 'Далі' : 'Завершити'}
								disabled={
									this.state.level === 'expert' &&
									(!this.state.noviceDone ||
										!this.state.beginnerDone ||
										!this.state.competentDone ||
										!this.state.proficientDone ||
										!this.state.expertDone)
								}
								primary={true}
								onClick={this.handleNext}
							/>
						</div>
					</CardText>
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
