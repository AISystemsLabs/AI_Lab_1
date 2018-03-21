import React from 'react';
import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton';
import * as firestore from '../../../firebase/firestore';
import PropTypes from 'prop-types';

import './Form.css';

class NoviceForm extends React.Component {
	constructor(props, context) {
		super(props);
		this.saveChanges = this.saveChanges.bind(this);
	}

	saveChanges(answers) {
		firestore
			.writeAnswersPerLevel('novice', answers, this.context.authUser)
			.subscribe(res => console.log('ok'));
	}

	render() {
		let answers = this.props.answers;
		return (
			<form>
				<div className="questionBox">
					<h3>Ви переживаєте за успіх в роботі?</h3>
					<RadioButtonGroup
						name="firstQuestion"
						valueSelected={answers && answers[0]}
						onChange={(event, value) => {
							answers[0] = value;
							this.saveChanges(answers);
						}}
					>
						<RadioButton value={0} label="Сильно (5)" />

						<RadioButton value={1} label="Не дуже (3)" />

						<RadioButton value={2} label="Спокійний (2)" />
					</RadioButtonGroup>
				</div>

				<div className="questionBox">
					<h3>Як швидко ви прагнете досягти результату?</h3>
					<RadioButtonGroup
						name="secondQuestion"
						valueSelected={answers && answers[1]}
						onChange={(event, value) => {
							answers[1] = value;
							this.saveChanges(answers);
						}}
					>
						<RadioButton value={0} label="Поступово (2)" />

						<RadioButton value={1} label="Якомога швидше (3)" />

						<RadioButton value={2} label="Дуже (5)" />
					</RadioButtonGroup>
				</div>

				<div className="questionBox">
					<h3>Легко попадаєте в тупик при проблемах в роботі?</h3>
					<RadioButtonGroup
						name="thirdQuestion"
						onChange={(event, value) => {
							answers[2] = value;
							this.saveChanges(answers);
						}}
						valueSelected={answers && answers[2]}
					>
						<RadioButton value={0} label="Неодмінно! (5)" />

						<RadioButton value={1} label="Поступово (3)" />

						<RadioButton value={2} label="Зрідка (2)" />
					</RadioButtonGroup>
				</div>

				<div className="questionBox">
					<h3>Чи потрібен Вам чіткий алгоритм для вирішення задач?</h3>
					<RadioButtonGroup
						name="fourthQuestion"
						onChange={(event, value) => {
							answers[3] = value;
							this.saveChanges(answers);
						}}
						valueSelected={answers && answers[3]}
					>
						<RadioButton value={0} label="Так! (5)" />

						<RadioButton value={1} label="Частково (3)" />

						<RadioButton value={2} label="В окремих випадках (2)" />
					</RadioButtonGroup>
				</div>
			</form>
		);
	}
}

NoviceForm.contextTypes = {
	authUser: PropTypes.object,
};

export default NoviceForm;
