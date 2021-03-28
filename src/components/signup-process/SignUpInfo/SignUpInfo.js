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
            usernameCheck: false,
            emailCheck: false,
            nicknameCheck: false,
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
            [e.target.id + 'Check']: false,
        });
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
        this.setState({ [e.target.id + 'Check']: true });
    };

    signUp = () => {
        const {
            img,
            username,
            email,
            password,
            passwordConfirm,
            nickname,
            usernameCheck,
            nicknameCheck,
            emailCheck,
        } = this.state;
        const { userNameUnique, emailUnique, nicknameUnique } = this.props;

        const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,20}$/;
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
        } else if (!userNameUnique || !usernameCheck) {
            //아이디 중복 확인
            alert('아이디 중복 여부를 확인해주세요');
        } else if (!emailUnique || !emailCheck) {
            //이메일 중복 확인
            alert('이메일 중복 여부를 확인해주세요');
        } else if (!nicknameUnique || !nicknameCheck) {
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
        }
    };
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.signup_success !== this.props.signup_success && this.props.signup_success) {
            //댓글 작성 성공했을 때
            this.props.onClickNext();
        }
    }
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
            password: '영문자(소), 숫자 특수문자 조합 8~20자',
            passwordConfirm: '비밀번호 재입력',
            nickname: '한글/영문/숫자 1~20자',
            email: '이메일 주소 입력',
        };
        const { previewURL, usernameCheck, emailCheck, nicknameCheck } = this.state;
        const { userNameUnique, emailUnique, nicknameUnique } = this.props;

        return (
            <div className="signupinfo">
                <div className="signupinfo__title">
                    <span className="not-pc">03 </span>
                    <span>회원정보입력</span>
                </div>
                <div className="not-pc">
                    <img className="signupinfo__step" src={step3}></img>
                </div>
                <div className="signupinfo__img">
                    <div className="signupinfo__title-form">대표사진</div>
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
                        <button onClick={this.onClickSelect}>
                            <svg
                                className="signupinfo__img--icon"
                                version="1.1"
                                id="Capa_1"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 471.04 471.04"
                                xmlSpace="preserve"
                            >
                                <g>
                                    <g>
                                        <path
                                            d="M414.72,112.64h-49.152l-27.136-40.96c-10.24-15.36-28.16-24.576-46.592-24.576H179.2
			c-18.432,0-36.352,9.216-46.592,24.576l-27.136,40.96H56.32C25.088,112.64,0,137.728,0,168.96v198.656
			c0,31.232,25.088,56.32,56.32,56.32h358.4c31.232,0,56.32-25.088,56.32-56.32V168.96C471.04,137.728,445.952,112.64,414.72,112.64
			z M235.52,377.856c-70.144,0-126.976-56.832-126.976-126.976c0-70.144,56.832-126.464,126.976-126.464
			s126.976,56.832,126.976,126.976C362.496,321.024,305.664,377.856,235.52,377.856z M407.552,192c-0.512,0-1.024,0-2.048,0h-20.48
			c-9.216-0.512-16.384-8.192-15.872-17.408c0.512-8.704,7.168-15.36,15.872-15.872h20.48c9.216-0.512,16.896,6.656,17.408,15.872
			C423.424,183.808,416.768,191.488,407.552,192z"
                                        />
                                    </g>
                                </g>
                                <g>
                                    <g>
                                        <path
                                            d="M235.52,180.736c-38.912,0-70.656,31.744-70.656,70.656s31.744,70.144,70.656,70.144s70.656-31.744,70.656-70.656
			C306.176,211.968,274.432,180.736,235.52,180.736z"
                                        />
                                    </g>
                                </g>
                            </svg>
                        </button>
                    )}
                    {previewURL && (
                        <div className="signupinfo__img-preview">
                            <img src={previewURL} alt="preview" />
                            <button id={this.type} onClick={this.deleteImg}>
                                X
                            </button>
                        </div>
                    )}
                </div>

                <div className="signupinfo__content">
                    {Object.keys(keyObject).map((value, index) => (
                        <div className="signupinfo__content-form" key={index}>
                            <div className="signupinfo__title-form">{keyObject[value]}</div>
                            <div className="signupinfo__content-form-input">
                                <input
                                    className={
                                        this.isPassword(value) ? 'signupinfo__content-form-input password' : undefined
                                    }
                                    id={value}
                                    type={this.isPassword(value) ? 'password' : undefined}
                                    label={keyObject[value]}
                                    value={this.state[value]}
                                    onChange={this.handleEditor}
                                    placeholder={placeHolder[value]}
                                />
                                {!this.isPassword(value) && (
                                    <button
                                        className={
                                            (value === 'username' && usernameCheck && userNameUnique) ||
                                            (value === 'email' && emailCheck && emailUnique) ||
                                            (value === 'nickname' && nicknameCheck && nicknameUnique)
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
