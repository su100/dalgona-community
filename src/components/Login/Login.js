import React, { Component } from 'react';
import biglogo from 'images/biglogo.png';
import loginlogo from 'images/login-tablet-logo.png';
import checkbox from 'images/checkbox.png';
import mobilecheckbox from 'images/mobile-checkbox.png';
import { Link } from 'react-router-dom';
import './Login.scss';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            remember: false,
        };
    }
    handleForm = (name) => (e) => {
        this.setState({ [name]: e.target.value });
        console.log(e.target.value);
    };
    signIn = () => {
        const { username, password, remember } = this.state;
        //각 항목이 모두 비어있지 않을 때
        if (username === '') {
            alert('아이디를 입력해주세요');
        } else if (password === '') {
            alert('비밀번호를 입력해주세요');
        } else {
            this.props.signIn(username, password);
            if (remember) {
                this.props.rememberLogin();
            }
        }
    };
    handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            this.signIn();
            console.log(this.state.username);
        }
    };
    onClickLogin = (e) => {
        this.signIn();
    };
    handleForm = (name) => (e) => {
        if (e.target.type === 'checkbox') {
            this.props.setRemember(e.target.checked);
        } else this.setState({ [name]: e.target.value });
    };
    render() {
        return (
            <div className="login">
                <div className="login__logo">
                    <div className="only-pc">
                        <img src={biglogo}></img>
                    </div>
                    <div className="not-pc">
                        <img src={loginlogo}></img>
                    </div>
                </div>
                <form className="login__input">
                    <div className="login__input-selectbox">
                        <input
                            className="remember-check"
                            type="checkbox"
                            id="remember"
                            onChange={this.handleForm('remember')}
                        />
                        <label htmlFor="remember">자동 로그인</label>
                    </div>
                    <input
                        className="login__input-id"
                        type="text"
                        onChange={this.handleForm('username')}
                        onKeyPress={this.handleKeyPress}
                    ></input>
                    <input
                        className="login__input-password"
                        type="password"
                        autoComplete="on"
                        onChange={this.handleForm('password')}
                        onKeyPress={this.handleKeyPress}
                    ></input>
                </form>
                <div className="login__button">
                    <button onClick={this.onClickLogin}>로그인</button>
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
            </div>
        );
    }
}

export default Login;
