import React from 'react';
import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton';

class NoviceForm extends React.Component {
	render() {
		return <form>{this.props.answers[0]}</form>;
	}
}

export default NoviceForm;
