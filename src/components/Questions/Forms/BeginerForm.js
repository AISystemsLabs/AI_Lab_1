import React from 'react';
import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton';
import * as firestore from '../../../firebase/firestore';
import PropTypes from 'prop-types';

import './Form.css';

class BeginnerForm extends React.Component {
	constructor(props, context) {
		super(props);
		this.saveChanges = this.saveChanges.bind(this);
	}

	saveChanges(answers) {
		firestore
			.writeAnswersPerLevel('beginner', answers, this.context.authUser)
			.subscribe(res => console.log('ok'));
	}

	render() {
		let answers = this.props.answers;
		return (
			<form>
				<div className="questionBox">
					<h3>Чи використовуєте Ви власний досвід при вирішенні задач?</h3>
					<RadioButtonGroup
						name="firstQuestion"
						valueSelected={answers && answers[0]}
						onChange={(event, value) => {
							answers[0] = value;
							this.saveChanges(answers);
						}}
					>
						<RadioButton value={0} label="Зрідка (5)" />

						<RadioButton value={1} label="Частково (3)" />

						<RadioButton value={2} label="Ні (2)" />
					</RadioButtonGroup>
				</div>

				<div className="questionBox">
					<h3>Чи користуєтесь Ви фіксованими правилами для вирішення задач?</h3>
					<RadioButtonGroup
						name="secondQuestion"
						valueSelected={answers && answers[1]}
						onChange={(event, value) => {
							answers[1] = value;
							this.saveChanges(answers);
						}}
					>
						<RadioButton value={0} label="Так (2)" />

						<RadioButton value={1} label="В окремих випадках (3)" />

						<RadioButton value={2} label="Ні, вони не потрібні (5)" />
					</RadioButtonGroup>
				</div>

				<div className="questionBox">
					<h3>Чи відчуваєте Ви загальний контекст вирішення задачі?</h3>
					<RadioButtonGroup
						name="thirdQuestion"
						onChange={(event, value) => {
							answers[2] = value;
							this.saveChanges(answers);
						}}
						valueSelected={answers && answers[2]}
					>
						<RadioButton value={0} label="Так (2)" />

						<RadioButton value={1} label="Частково (3)" />

						<RadioButton value={2} label="В окремих випадках (5)" />
					</RadioButtonGroup>
				</div>
			</form>
		);
	}
}

BeginnerForm.contextTypes = {
	authUser: PropTypes.object,
};

export default BeginnerForm;
