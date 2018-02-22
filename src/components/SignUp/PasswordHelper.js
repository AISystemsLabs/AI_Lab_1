import React from 'react';
import { Stepper, Step, StepLabel } from 'material-ui/Stepper';
import { Card, CardHeader, CardText } from 'material-ui/Card';
import FontIcon from 'material-ui/FontIcon';
import * as colors from 'material-ui/styles/colors';

export const crossIcon = (
	<FontIcon className="ion-close" color={colors.red500} />
);
export const tickIcon = (
	<FontIcon className="ion-checkmark" color={colors.green500} />
);

class PasswordHelper extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		const lengthIcon = this.props.IsLengthOk ? tickIcon : crossIcon;
		const letterIcon = this.props.IsLetter ? tickIcon : crossIcon;
		const numberIcon = this.props.IsNumber ? tickIcon : crossIcon;

		return (
			<Card>
				<CardHeader title="Ваш пароль повинен:" />
				<CardText>
					<Stepper orientation="vertical" connector={null}>
						<Step>
							<StepLabel icon={lengthIcon}>
								Містити мінімум 6 символів
							</StepLabel>
						</Step>
						<Step>
							<StepLabel icon={letterIcon}>
								{' '}
								Містити хоча б одну літеру
							</StepLabel>
						</Step>
						<Step>
							<StepLabel icon={numberIcon}>Містити хоча б одну цифру</StepLabel>
						</Step>
					</Stepper>
				</CardText>
			</Card>
		);
	}
}

export default PasswordHelper;
