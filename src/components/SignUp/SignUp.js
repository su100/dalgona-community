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
        this.state = {
            currentPage: 'agree',
        };
    }

    onClickNext = () => {
        const { currentPage } = this.state;
        if (currentPage === 'agree') {
            this.setState({ currentPage: 'confirm' });
        } else if (currentPage === 'confirm') {
            this.setState({ currentPage: 'info' });
        } else if (currentPage === 'info') {
            this.setState({ currentPage: 'finish' });
        } else {
            this.props.history.push('/');
        }
    };

    render() {
        const { currentPage } = this.state;
        return (
            <div className="signup">
                <div className="not-pc">
                    <div className="signup__title">회원가입</div>
                </div>
                {currentPage === 'agree' && <SignUpAgree />}
                {currentPage === 'confirm' && <SignUpConfirm />}
                {currentPage === 'info' && <SignUpInfo />}
                {currentPage === 'finish' && <SignUpFinish />}
                <button className="signup__button" onClick={this.onClickNext}>
                    다음
                </button>
            </div>
        );
    }
}

export default SignUp;
