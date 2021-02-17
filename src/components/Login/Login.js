import React, { Component } from 'react';
import logo from 'images/logo.png';
import { Link } from 'react-router-dom';
import './Login.scss';

class Login extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="login">
                <div className="login__logo">
                    <img src={logo}></img>
                </div>
                <div className="login__input">
                    <input></input>
                    <input></input>
                    <div>
                        <select></select>
                        <span>자동 로그인</span>
                    </div>
                </div>
                <div className="login__searchandsignup">
                    <div>
                        <Link to="/find/id">아이디 찾기</Link>
                    </div>
                    <div>
                        <Link to="/find/pw">비밀번호 찾기</Link>
                    </div>
                    <div>
                        <Link to="signup">회원가입</Link>
                    </div>
                </div>
                <div className="login__button">
                    <button>로그인</button>
                </div>
            </div>
        );
    }
}

export default Login;
