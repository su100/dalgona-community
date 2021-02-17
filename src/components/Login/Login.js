import React, { Component } from 'react';
import logo from 'images/logo.png';
import unclick from 'images/unclick.png';
import { Link } from 'react-router-dom';
import './Login.scss';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: '',
            password: '',
            checked: false,
        };
    }
    handleForm = (name) => (e) => {
        this.setState({ [name]: e.target.value });
        console.log(e.target.value);
    };
    // handleKeyPress = (e) => {
    //     if (e.key === 'Enter') {
    //         this.signIn();
    //     }
    // };
    render() {
        return (
            <div className="login">
                <div className="login__logo">
                    <img src={logo}></img>
                </div>
                <div className="login__input">
                    <input
                        className="login__input-id"
                        type="text"
                        onChange={this.handleForm('id')}
                        onKeyPress={this.handleKeyPress}
                    ></input>
                    <input
                        className="login__input-password"
                        type="password"
                        onChange={this.handleForm('password')}
                        onKeyPress={this.handleKeyPress}
                    ></input>
                    <div className="login__input-selectbox">
                        <img src={unclick}></img>
                        <span>자동 로그인</span>
                    </div>
                </div>
                <div className="login__searchandsignup">
                    <div className="login__searchandsignup-id">
                        <Link to="/find/id">아이디 찾기</Link>
                    </div>
                    <div className="login__searchandsignup-password">
                        <Link to="/find/pw">비밀번호 찾기</Link>
                    </div>
                    <div className="login__searchandsignup-signup">
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