import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import profile from 'images/profile.png';
import photoIcon from 'images/photo.png';

import './Profile.scss';

class Profile extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="profile">
                <div className="profile__header">
                    <div className="not-pc">
                        <span>프로필수정</span>
                    </div>
                </div>
                <div className="profile__img">
                    <input
                        type="file"
                        accept="image/*"
                        ref={this.fileInput}
                        onChange={this.selectImg}
                        onClick={(event) => {
                            event.target.value = null;
                        }}
                    />
                    <button className="" onClick={this.onClickSelect}>
                        <img src={photoIcon} alt="photoIcon" />
                    </button>
                </div>
                <div className="profile__content">
                    <div className="profile__content-nickname">
                        <span>닉네임 </span>
                        <div className="profile__content-nickname button">
                            <input></input>
                            <button>중복확인</button>
                        </div>
                    </div>
                    <div className="profile__content-introduce">
                        <span>자기소개</span>
                        <input></input>
                        <div className="only-pc">
                            <button>수정</button>
                        </div>
                    </div>
                </div>
                <div className="not-pc">
                    <div className="profile__button">
                        <button className="profile__button-modify">수정</button>
                        <button className="profile__button-secession">탈퇴</button>
                    </div>
                </div>
            </div>
        );
    }
}

export default Profile;
