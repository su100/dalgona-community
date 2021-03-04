import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import step3 from 'images/step3.png';
import photoIcon from 'images/photo.svg';
import './SignUpInfo.scss';

class SignUpInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            type: '',
            passwordConfirm: '',
            nickname: '',
            email: '',
            Img: null,
            previewURL: '',
            rePreview: '',
        };
        this.fileInput = React.createRef();
    }
    setImage = (file) => {
        this.setState({ Img: file });
    };
    setPreview = (url) => {
        this.setState({ previewURL: url });
    };
    selectImg = (e) => {
        let reader = new FileReader();
        let file = e.target.files[0];
        reader.onloadend = () => {
            this.setImage(file);
            this.setPreview(reader.result);
        };
        reader.readAsDataURL(file);
    };
    deleteImg = (e) => {
        this.setState({ Img: null, previewURL: '' });
    };
    onClickSelect = () => {
        this.fileInput.current.click();
    };
    handleEditor = (e) => {
        this.setState({
            [e.target.id]: e.target.value,
        });
        //console.log(e.target.value);
    };
    isPassword = (value) => {
        if (value.indexOf('password') !== -1) return true;
        return false;
    };
    checkUnique = (name) => (e) => {
        const { username, email, nickname } = this.state;

        //정규표현식으로 조건검사
        const idRegex = /^[a-z0-9!@#$%^&*]{5,20}$/;
        const emailRegex = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
        const nicknameRegex = /^[가-힣a-zA-Z0-9]{1,20}$/;
        if (name === 'username') {
            if (username === '') alert('아이디를 입력해주세요');
            else if (!idRegex.test(username)) alert('아이디 형식이 잘못되었습니다.');
            else this.props.checkUsername(username);
        } else if (name === 'email') {
            if (email === '') alert('이메일을 입력해주세요');
            else if (!emailRegex.test(email)) alert('이메일 형식이 잘못되었습니다.');
            else this.props.checkEmail(email);
        } else {
            if (nickname === '') alert('닉네임을 입력해주세요');
            else if (!nicknameRegex.test(nickname)) alert('닉네임 형식이 잘못되었습니다.');
            else this.props.checkNickname(nickname);
        }
    };
    onClickDuplicate = (e) => {
        const { username, nickname, email } = this.state;
        if (e.target.id === 'username' && username !== '') {
            this.props.checkUsername(username);
        } else if (e.target.id === 'nickname' && nickname !== '') {
            this.props.checkNickname(nickname);
        } else if (e.target.id === 'email' && email !== '') {
            this.props.checkEmail(email);
        }
    };
    signUp = () => {
        const { img, username, email, password, passwordConfirm, nickname } = this.state;
        const { userNameUnique, emailUnique, nicknameUnique } = this.props;

        const passwordRegex = /^[a-zA-Z0-9]{8,20}$/;
        //항목 검사
        if (username === '') {
            alert('아이디를 입력해주세요');
            //아이디 조건 검사 추가해야함  5~20자의 영문 소문자, 숫자,  !@#$%^&* (숫자 1~8 윗 부분) 만 가능
        } else if (email === '') {
            alert('이메일을 입력해주세요');
            //이메일 형식 검사 추가해야함
        } else if (password === '') {
            alert('비밀번호를 입력해주세요');
            //비밀번호 조건 검사 추가해야함 영문,영문+숫자 8자리 이상
        } else if (passwordConfirm !== password) {
            alert('비밀번호가 일치하지 않습니다.');
        } else if (nickname === '') {
            alert('닉네임을 입력해주세요');
            //닉네임 조건 검사 추가해야함 한글/영문/숫자 2-20자
        } else if (!userNameUnique) {
            //아이디 중복 확인
            alert('아이디 중복 여부를 확인해주세요');
        } else if (!emailUnique) {
            //이메일 중복 확인
            alert('이메일 중복 여부를 확인해주세요');
        } else if (!nicknameUnique) {
            //닉네임 중복 확인
            alert('닉네임 중복 여부를 확인해주세요');
        } else if (!passwordRegex.test(password)) {
            alert('패스워드 형식을 확인해주세요');
        } else {
            const formData = new FormData();
            formData.append('username', username);
            formData.append('email', email);
            formData.append('password1', password);
            formData.append('password2', passwordConfirm);
            formData.append('nickname', nickname);
            if (img) formData.append('profile_image', img);
            this.props.signUp(formData);
            this.props.onClickNext();
        }
    };
    render() {
        const keyObject = {
            username: '아이디',
            password: '비밀번호',
            passwordConfirm: '비밀번호 확인',
            nickname: '닉네임',
            email: '이메일',
        };
        const placeHolder = {
            username: '영문자(소), 숫자 조합 5~20자',
            password: '영문자(소), 숫자 특수문자 조합 5~20자',
            passwordConfirm: '비밀번호 재입력',
            nickname: '한글/영문/숫자 1~20자',
            email: '이메일 주소 입력',
        };
        const { duplicate, previewURL } = this.state;
        const { userNameUnique, emailUnique, nicknameUnique } = this.props;

        return (
            <div className="signupinfo">
                <div className="signupinfo__title">
                    <span className="not-pc">03 </span>
                    <span>회원정보입력</span>
                </div>
                <div className="not-pc">
                    <img src={step3}></img>
                </div>
                <div className="not-pc">
                    <div className="signupinfo__img">
                        <div className="signupinfo__img-title">
                            <span>대표사진</span>
                        </div>
                        <input
                            type="file"
                            accept="image/*"
                            ref={this.fileInput}
                            onChange={this.selectImg}
                            onClick={(event) => {
                                event.target.value = null;
                            }}
                        />
                        {!previewURL && (
                            <button className="" onClick={this.onClickSelect}>
                                <img src={photoIcon} alt="photoIcon" />
                            </button>
                        )}
                        {previewURL && (
                            <div className="signupinfo__img-preview">
                                <div className="signupinfo__img-preview-background" />
                                <img src={previewURL} alt="preview" />
                                <button id={this.type} onClick={this.deleteImg}>
                                    X
                                </button>
                            </div>
                        )}
                    </div>
                </div>
                <div className="signupinfo__content">
                    {Object.keys(keyObject).map((value, index) => (
                        <div className="signupinfo__content-form" key={index}>
                            <span>{keyObject[value]}</span>
                            <div className="signupinfo__content-form-input">
                                <input
                                    className={
                                        this.isPassword(value) ? 'signupinfo__content-form-input password' : undefined
                                    }
                                    id={value}
                                    label={keyObject[value]}
                                    value={this.state[value]}
                                    onChange={this.handleEditor}
                                    placeholder={placeHolder[value]}
                                />
                                {!this.isPassword(value) && (
                                    <button
                                        className={
                                            (value === 'username' && userNameUnique) ||
                                            (value === 'email' && emailUnique) ||
                                            (value === 'nickname' && nicknameUnique)
                                                ? 'signupinfo__content-form-input click'
                                                : 'signupinfo__content-form-input noclick'
                                        }
                                        id={value}
                                        onClick={this.onClickDuplicate}
                                    >
                                        중복확인
                                    </button>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
                <button className="signupinfo__button" onClick={this.signUp}>
                    다음
                </button>
            </div>
        );
    }
}

export default SignUpInfo;
