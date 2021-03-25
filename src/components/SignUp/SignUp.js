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
            agreeConfirm: false,
        };
    }
    onClickNext = () => {
        const { currentPage, agreeConfirm } = this.state;
        if (currentPage === 'agree') {
            if (agreeConfirm) this.setState({ currentPage: 'confirm' });
            else alert('동의가 필요합니다');
        } else if (currentPage === 'confirm') {
            this.setState({ currentPage: 'info' });
        } else if (currentPage === 'info') {
            this.props.signUp();
            this.setState({ currentPage: 'finish' });
        } else {
            this.props.history.push('/');
        }
    };

    handleAgreeConfirm = () => {
        const { agreeConfirm } = this.state;
        this.setState({ agreeConfirm: !agreeConfirm });
    };

    render() {
        const { currentPage, agreeConfirm } = this.state;
        const { userNameUnique, emailUnique, nicknameUnique, setUnique } = this.props;
        return (
            <div className="signup">
                <div className="not-pc signup__title">회원가입</div>
                {currentPage === 'agree' && (
                    <SignUpAgree handleAgreeConfirm={this.handleAgreeConfirm} agreeConfirm={agreeConfirm} />
                )}
                {currentPage === 'confirm' && <SignUpConfirm />}
                {currentPage === 'info' && (
                    <SignUpInfo
                        userNameUnique={userNameUnique}
                        emailUnique={emailUnique}
                        nicknameUnique={nicknameUnique}
                        signUp={this.props.signUp}
                        checkUsername={this.props.checkUsername}
                        checkEmail={this.props.checkEmail}
                        checkNickname={this.props.checkNickname}
                        setUnique={setUnique}
                        onClickNext={this.onClickNext}
                    />
                )}
                {currentPage === 'finish' && <SignUpFinish />}
                {currentPage !== 'info' && (
                    <button className="signup__button" onClick={this.onClickNext}>
                        다음
                    </button>
                )}
            </div>
        );
    }
}

export default SignUp;
