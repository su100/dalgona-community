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
    const reader = new FileReader();
    const file = e.target.files[0];

    reader.onloadend = () => {
      this.setState({ previewURL: reader.result, img: file });
    };
    reader.readAsDataURL(file);
  };

  deleteImg = () => {
    this.setState({ img: null, previewURL: '' });
  };

  onClickSelect = () => {
    this.fileInput.current.click();
  };

  handleChange = (e) => {
    if (e.target.id === 'nickname') {
      // 닉네임 변경시 중복검사 초기화
      this.setState({ isUnique: false });
    }
    this.setState({ [e.target.id]: e.target.value });
  };

  checkNickname = () => {
    // 원래 닉네임이면 중복체크 안 함
    const { profile, checkNickname } = this.props;
    const { nickname } = this.state;
    if (profile.get('nickname') === nickname) {
      alert('현재 닉네임입니다.');
    } else {
      checkNickname(nickname); // 중복확인하기
      this.setState({ isUnique: true }); // 중복확인버튼 눌렀음
    }
  };

  updateProfile = () => {
    const { profile, nicknameUnique, updateProfile } = this.props;
    const { isUnique, nickname, introduction, img, previewURL } = this.state;

    if (nickname !== profile.get('nickname') && !(isUnique && nicknameUnique)) {
      // 닉네임 변경시 중복체크해야함: 중복확인 버튼 누른 여부와 반환값이 참인지 확인
      alert('닉네임 중복확인을 해주세요');
    } else if (nickname.trim() === '') {
      // 빈값 검사
      alert('닉네임을 입력해주세요.');
    } else {
      const formData = new FormData();
      formData.append('nickname', nickname);
      formData.append('introduction', introduction);
      if (img || (profile.profile_image && previewURL === '')) {
        // 이미지 업로드 있거나 있던거 삭제했을 경우
        formData.append('profile_image', img);
      }
      updateProfile(formData);
    }
  };

  deleteUser = () => {
    const { deleteUser } = this.props;
    if (window.confirm('회원탈퇴하시겠습니까?\n탈퇴 시 복구할 수 없습니다.')) {
      deleteUser();
    }
  };

  render() {
    const { profile, nicknameUnique } = this.props;
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
            onClick={(e) => {
              e.target.value = null;
            }}
          />
          {!previewURL && (
            <div className="profile__default--empty" onClick={this.onClickSelect} aria-hidden="true">
              <img className="profile__default--photoicon" src={photoIcon} alt="photoIcon" />
            </div>
          )}
          {previewURL && (
            <div className="profile__default--preview">
              <img src={previewURL} alt="preview" onClick={this.onClickSelect} aria-hidden="true" />
              <button type="button" onClick={this.deleteImg}>
                ✘
              </button>
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
              type="button"
              className={nickname !== profile.get('nickname') && !(isUnique && nicknameUnique) ? '' : 'active'}
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
          <button type="button" onClick={this.updateProfile}>
            수정하기
          </button>
          <button type="button" onClick={this.deleteUser}>
            탈퇴하기
          </button>
        </div>
      </div>
    );
  }
}

export default Profile;
