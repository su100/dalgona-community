import React from 'react';
import { Link } from 'react-router-dom';
import logo from 'images/logo.png';
import avatarbox from 'images/avatarbox.png';
import './Sidebar.scss';

const Sidebar = ({ handleSidebar, isLogin }) => {
    return (
        <div className="sidebar">
            <div className="sidebar__header">
                <img src={logo} onClick={handleSidebar} />
            </div>
            <div className="sidebar__profile">
                <div className="sidebar__profile-img">
                    <img src={avatarbox}></img>
                </div>
                <div className="sidebar__profile-myinformation">
                    <span className="sidebar__profile-myinformation-nickname">닉네임</span>
                    <br></br>
                    <span className="sidebar__profile-myinformation-description">자기소개입니다.</span>
                </div>
            </div>
            <div className="sidebar__link">
                <div className="sidebar__link-content">
                    <Link to="/my/profile">프로필 수정</Link>
                </div>
                <div className="sidebar__link-content">
                    <Link to="/my/activity">활동내역</Link>
                </div>
                <div className="sidebar__link-content">
                    <Link to="/my/point">별내역</Link>
                </div>
                <div className="sidebar__link-content">
                    <Link>로그아웃</Link>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
