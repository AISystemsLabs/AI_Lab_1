import React from 'react';
import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton';
import * as firestore from '../../../firebase/firestore';
import PropTypes from 'prop-types';

import './Form.css';

class ExpertForm extends React.Component {
	constructor(props, context) {
		super(props);
		this.saveChanges = this.saveChanges.bind(this);
	}

	saveChanges(answers) {
		firestore
			.writeAnswersPerLevel('expert', answers, this.context.authUser)
			.subscribe(res => console.log('ok'));
	}

	render() {
		let answers = this.props.answers;
		return (
			<form>
				<div className="questionBox">
					<h3>Чи обираєте Ви нові методи своєї роботи?</h3>
					<RadioButtonGroup
						name="firstQuestion"
						valueSelected={answers && answers[0]}
						onChange={(event, value) => {
							answers[0] = value;
							this.saveChanges(answers);
						}}
					>
						<RadioButton value={0} label="Так" />

						<RadioButton value={1} label="Частково" />

						<RadioButton value={2} label="Вистачає досвіду" />
					</RadioButtonGroup>
				</div>

				<div className="questionBox">
					<h3>Чи допомагає власна інтуїція при вирішенні задач?</h3>
					<RadioButtonGroup
						name="secondQuestion"
						valueSelected={answers && answers[1]}
						onChange={(event, value) => {
							answers[1] = value;
							this.saveChanges(answers);
						}}
					>
						<RadioButton value={0} label="Так" />

						<RadioButton value={1} label="Частково" />

						<RadioButton value={2} label="При емоційному напруженні" />
					</RadioButtonGroup>
				</div>

				<div className="questionBox">
					<h3>Чи застовуєте Ви рішення задач за аналогією?</h3>
					<RadioButtonGroup
						name="thirdQuestion"
						onChange={(event, value) => {
							answers[2] = value;
							this.saveChanges(answers);
						}}
						valueSelected={answers && answers[2]}
					>
						<RadioButton value={0} label="Часто" />

						<RadioButton value={1} label="Зрідка" />

						<RadioButton value={2} label="ТІльки власний варіант" />
					</RadioButtonGroup>
				</div>
			</form>
		);
	}
}

ExpertForm.contextTypes = {
	authUser: PropTypes.object,
};

export default ExpertForm;
