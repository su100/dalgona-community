import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import profile from 'images/profile.png';
import photoIcon from 'images/photo.svg';

import './EditProfile.scss';

class EditProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            nickName: '',
            introduce: '',
            Img: null,
            previewURL: '',
            rePreview: '',
        };
        this.fileInput = React.createRef();
    }
    handleEditor = (e) => {
        this.setState({
            [e.target.id]: e.target.value,
        });
        console.log(e.target.value);
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
    onClickSelect = () => {
        this.fileInput.current.click();
    };
    deleteImg = (e) => {
        this.setState({ Img: null, previewURL: '' });
    };
    setPreview = (url) => {
        this.setState({ previewURL: url });
    };
    setImage = (file) => {
        this.setState({ Img: file });
    };
    render() {
        const { previewURL } = this.state;
        return (
            <div className="editprofile">
                <div className="editprofile__header">
                    <div className="not-pc">
                        <span>프로필수정</span>
                    </div>
                </div>
                <div className="editprofile__img">
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
                        <div className="editprofile__img-preview">
                            <div className="editprofile__img-preview-background" />
                            <img src={previewURL} alt="preview" />
                            <button id={this.type} onClick={this.deleteImg}>
                                X
                            </button>
                        </div>
                    )}
                </div>
                <div className="editprofile__content">
                    <div className="editprofile__content-nickname">
                        <span>닉네임 </span>
                        <div className="editprofile__content-nickname button">
                            <input id="nickname" value={this.state.nickname} onChange={this.handleEditor} />
                            <button>중복확인</button>
                        </div>
                    </div>
                    <div className="editprofile__content-introduce">
                        <span>자기소개</span>
                        <input id="introduce" value={this.state.introduce} onChange={this.handleEditor} />
                        <div className="only-pc">
                            <button>수정</button>
                        </div>
                    </div>
                </div>
                <div className="not-pc">
                    <div className="editprofile__button">
                        <button className="editprofile__button-modify">수정</button>
                        <button className="editprofile__button-secession">탈퇴</button>
                    </div>
                </div>
            </div>
        );
    }
}

export default EditProfile;
