import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import SignUpAgree from 'components/signup-process/SignUpAgree';
import './SignUp.scss';

class SignUp extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="signup">
                <SignUpAgree />
            </div>
        );
    }
}

export default SignUp;
