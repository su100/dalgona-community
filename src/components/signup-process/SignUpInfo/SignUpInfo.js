import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import step3 from 'images/step3.png';
import photoIcon from 'images/photo.svg';
import './SignUpInfo.scss';

class SignUpInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            Id: '',
            password: '',
            type: '',
            passwordConfirm: '',
            nickName: '',
            email: '',
            Img: null,
            previewURL: '',
            rePreview: '',
            idDuplicate: true,
            nicNameDuplicate: true,
            emailDuplicate: true,
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
    };
    isPassword = (value) => {
        if (value.indexOf('password') !== -1) return true;
        return false;
    };
    onClickDuplicate = () => {
        const { duplicate } = this.state;
        this.setState({ duplicate: !duplicate });
        console.log(duplicate);
    };

    render() {
        const keyObject = {
            Id: '아이디',
            password: '비밀번호',
            passwordConfirm: '비밀번호 확인',
            nickName: '닉네임',
            email: '이메일',
        };
        const placeHolder = {
            Id: '영문자(소), 숫자 조합 5~20자',
            password: '영문자(소), 숫자 특수문자 조합 5~20자',
            passwordConfirm: '비밀번호 재입력',
            nickName: '한글/영문/숫자 1~20자',
            email: '이메일 주소 입력',
        };
        const { duplicate, previewURL } = this.state;
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
                                    label={keyObject[value]}
                                    value={this.state[value]}
                                    onChange={this.handleEditor}
                                    placeholder={placeHolder[value]}
                                />
                                {!this.isPassword(value) && (
                                    <button
                                        className={
                                            !duplicate
                                                ? 'signupinfo__content-form-input click'
                                                : 'signupinfo__content-form-input noclick'
                                        }
                                        onClick={this.onClickDuplicate}
                                    >
                                        중복확인
                                    </button>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
    }
}

export default SignUpInfo;
