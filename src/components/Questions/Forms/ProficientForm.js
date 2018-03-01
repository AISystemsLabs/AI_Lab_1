import React from 'react';
import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton';
import * as firestore from '../../../firebase/firestore';
import PropTypes from 'prop-types';

import './Form.css';

class ProficientForm extends React.Component {
	constructor(props, context) {
		super(props);
		this.saveChanges = this.saveChanges.bind(this);
	}

	saveChanges(answers) {
		firestore
			.writeAnswersPerLevel('proficient', answers, this.context.authUser)
			.subscribe(res => console.log('ok'));
	}

	render() {
		let answers = this.props.answers;
		return (
			<form>
				<div className="questionBox">
					<h3>Чи необхідний Вам весь контекст задачі?</h3>
					<RadioButtonGroup
						name="firstQuestion"
						valueSelected={answers && answers[0]}
						onChange={(event, value) => {
							answers[0] = value;
							this.saveChanges(answers);
						}}
					>
						<RadioButton value={0} label="Так" />

						<RadioButton value={1} label="В окремих деталях" />

						<RadioButton value={2} label="В загальному" />
					</RadioButtonGroup>
				</div>

				<div className="questionBox">
					<h3>Чи переглядаєте Ви свої наміри до вирішення задачі?</h3>
					<RadioButtonGroup
						name="secondQuestion"
						valueSelected={answers && answers[1]}
						onChange={(event, value) => {
							answers[1] = value;
							this.saveChanges(answers);
						}}
					>
						<RadioButton value={0} label="Так" />

						<RadioButton value={1} label="Зрідка" />

						<RadioButton value={2} label="Коли є потреба" />
					</RadioButtonGroup>
				</div>

				<div className="questionBox">
					<h3>Чи здатні Ви навчатись у інших ?</h3>
					<RadioButtonGroup
						name="thirdQuestion"
						onChange={(event, value) => {
							answers[2] = value;
							this.saveChanges(answers);
						}}
						valueSelected={answers && answers[2]}
					>
						<RadioButton value={0} label="Так" />

						<RadioButton value={1} label="Зрідка" />

						<RadioButton value={2} label="Коли є потреба" />
					</RadioButtonGroup>
				</div>
			</form>
		);
	}
}

ProficientForm.contextTypes = {
	authUser: PropTypes.object,
};

export default ProficientForm;
