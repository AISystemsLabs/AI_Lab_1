import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import SignUpForm from './SignUpForm';
import SignUpLink from './SignUpLink';

class SignUp extends Component{

    constructor(props){
        super(props);
    }

    render(){
        return (
            <div>
                <h1>Реєстрація</h1>
                <SignUpForm history ={this.props.history}/>
            </div>
        );
    }
}

export default withRouter(SignUp);