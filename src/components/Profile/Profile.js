import React, { Component } from 'react';
import photoIcon from 'images/photo.svg';
import './Profile.scss';

class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isUnique: true,
            previewURL: props.profile.get('profile_image'),
            nickname: props.profile.get('nickname'),
            introduction: props.profile.get('introduction'),
            img: null,
        };
        this.fileInput = React.createRef();
    }

    selectImg = (e) => {
        let reader = new FileReader();
        let file = e.target.files[0];

        reader.onloadend = () => {
            this.setState({ previewURL: reader.result, img: file });
        };
        reader.readAsDataURL(file);
    };

    deleteImg = (e) => {
        this.setState({ img: null, previewURL: '' });
    };

    onClickSelect = () => {
        this.fileInput.current.click();
    };

    handleChange = (e) => {
        if (e.target.id === 'nickname') {
            //닉네임 변경시 중복검사 초기화
            this.setState({ isUnique: false });
        }
        this.setState({ [e.target.id]: e.target.value });
    };

    checkNickname = () => {
        //원래 닉네임이면 중복체크 안 함
        if (this.props.profile.get('nickname') === this.state.nickname) {
            alert('현재 닉네임입니다.');
        } else {
            this.props.checkNickname(this.state.nickname); //중복확인하기
            this.setState({ isUnique: true }); //중복확인버튼 눌렀음
        }
    };

    updateProfile = () => {
        const { isUnique, nickname, introduction, img, previewURL } = this.state;

        if (nickname !== this.props.profile.get('nickname') && !(isUnique && this.props.nicknameUnique)) {
            //닉네임 변경시 중복체크해야함: 중복확인 버튼 누른 여부와 반환값이 참인지 확인
            alert('닉네임 중복확인을 해주세요');
        } else if (nickname.trim() === '') {
            //빈값 검사
            alert('닉네임을 입력해주세요.');
        } else {
            let formData = new FormData();
            formData.append('nickname', nickname);
            formData.append('introduction', introduction);
            if (img || (this.props.profile.profile_image && previewURL === '')) {
                //이미지 업로드 있거나 있던거 삭제했을 경우
                formData.append('profile_image', img);
            }
            this.props.updateProfile(formData);
        }
    };
    deleteUser = () => {
        if (window.confirm('회원탈퇴하시겠습니까?\n탈퇴 시 복구할 수 없습니다.')) {
            this.props.deleteUser();
        }
    };
    render() {
        const { nickname, introduction, previewURL, isUnique } = this.state;
        return (
            <div className="profile">
                <h4 className="not-pc">프로필 수정</h4>
                <h5 className="not-pc">대표사진</h5>
                <div className="profile__default">
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
                        <div className="profile__default--empty" onClick={this.onClickSelect}>
                            <img className="profile__default--photoicon" src={photoIcon} alt="photoIcon" />
                        </div>
                    )}
                    {previewURL && (
                        <div className="profile__default--preview">
                            <img src={previewURL} alt="preview" onClick={this.onClickSelect} />
                            <button onClick={this.deleteImg}>✘</button>
                        </div>
                    )}
                </div>
                <div className="profile__box">
                    <h5>닉네임</h5>
                    <div className="profile__row">
                        <input
                            type="text"
                            id="nickname"
                            value={nickname}
                            onChange={this.handleChange}
                            placeholder="한글/영문/숫자 1-20자"
                        />
                        <button
                            className={
                                nickname !== this.props.profile.get('nickname') &&
                                !(isUnique && this.props.nicknameUnique)
                                    ? ''
                                    : 'active'
                            }
                            onClick={this.checkNickname}
                        >
                            중복확인
                        </button>
                    </div>
                    <h5>자기소개</h5>
                    <textarea
                        id="introduction"
                        value={introduction}
                        onChange={this.handleChange}
                        placeholder="자기소개를 입력해주세요."
                    />
                    <button onClick={this.updateProfile}>수정하기</button>
                    <button onClick={this.deleteUser}>탈퇴하기</button>
                </div>
            </div>
        );
    }
}

export default Profile;
