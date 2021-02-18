import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import SignUpAgree from 'components/signup-process/SignUpAgree';
import SignUpConfirm from 'components/signup-process/SignUpConfirm';
import SignUpInfo from 'components/signup-process/SignUpInfo';
import SignUpFinish from 'components/signup-process/SignUpFinish';
import './SignUp.scss';

class SignUp extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="signup">
                <div className="only-pc">
                    <SignUpAgree />
                    <SignUpConfirm />
                    <SignUpInfo />
                    <SignUpFinish />
                </div>
            </div>
        );
    }
}

export default SignUp;
