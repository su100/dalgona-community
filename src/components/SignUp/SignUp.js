import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import SignUpAgree from 'components/signup-process/SignUpAgree';
import SignUpConfirm from 'components/signup-process/SignUpConfirm';
import SignUpInfo from 'components/signup-process/SignUpInfo';
import './SignUp.scss';

class SignUp extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="signup">
                <SignUpInfo />
            </div>
        );
    }
}

export default SignUp;
