import React from 'react';
import {Link} from 'react-router-dom';

import * as routes from '../../constants/routes'

class SignUpLink extends React.Component{
    render(){
        return (
            <p>
                Не маєте акаунту?
                {' '}
                <Link to={routes.SIGN_UP}>Реєстрація</Link>
            </p>
        )
    }
}

export default SignUpLink;