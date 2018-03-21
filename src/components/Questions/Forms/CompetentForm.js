import React from 'react';
import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton';
import * as firestore from '../../../firebase/firestore';
import PropTypes from 'prop-types';

import './Form.css';

class CompetentForm extends React.Component {
	constructor(props, context) {
		super(props);
		this.saveChanges = this.saveChanges.bind(this);
	}

	saveChanges(answers) {
		firestore
			.writeAnswersPerLevel('competent', answers, this.context.authUser)
			.subscribe(res => console.log('ok'));
	}

	render() {
		let answers = this.props.answers;
		return (
			<form>
				<div className="questionBox">
					<h3>Чи можете Ви побудувати модель вирішуваної задачі?</h3>
					<RadioButtonGroup
						name="firstQuestion"
						valueSelected={answers && answers[0]}
						onChange={(event, value) => {
							answers[0] = value;
							this.saveChanges(answers);
						}}
					>
						<RadioButton value={0} label="Так (5)" />

						<RadioButton value={1} label="Не повністю (3)" />

						<RadioButton value={2} label="В окремих випадках (2)" />
					</RadioButtonGroup>
				</div>

				<div className="questionBox">
					<h3>Чи вистачає Вам ініціативи при вирішенні задач</h3>
					<RadioButtonGroup
						name="secondQuestion"
						valueSelected={answers && answers[1]}
						onChange={(event, value) => {
							answers[1] = value;
							this.saveChanges(answers);
						}}
					>
						<RadioButton value={0} label="Так (5)" />

						<RadioButton value={1} label="Зрідка (3)" />

						<RadioButton value={2} label="Потрібне натхнення (2)" />
					</RadioButtonGroup>
				</div>

				<div className="questionBox">
					<h3>Чи можете Ви вирішувати проблеми, з якими ще не стикались?</h3>
					<RadioButtonGroup
						name="thirdQuestion"
						onChange={(event, value) => {
							answers[2] = value;
							this.saveChanges(answers);
						}}
						valueSelected={answers && answers[2]}
					>
						<RadioButton value={0} label="Так (2)" />

						<RadioButton value={1} label="В окремих випадках (3)" />

						<RadioButton value={2} label="Ні (5)" />
					</RadioButtonGroup>
				</div>
			</form>
		);
	}
}

CompetentForm.contextTypes = {
	authUser: PropTypes.object,
};

export default CompetentForm;
