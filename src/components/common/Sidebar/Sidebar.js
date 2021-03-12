import React from 'react';
import { Link } from 'react-router-dom';
import logo from 'images/logo.png';
import avatarbox from 'images/avatarbox.png';
import './Sidebar.scss';

const Sidebar = ({ handleSidebar, isAuthenticated, profile, signOut }) => {
    console.log(profile);
    return (
        <div className="sidebar">
            <div className="sidebar__header">
                <img src={logo} onClick={handleSidebar} />
            </div>
            {isAuthenticated && (
                <div className="sidebar__profile">
                    <div className="sidebar__profile-img">
                        <img src={profile.get('profile_image') ? profile.get('profile_image') : avatarbox}></img>
                    </div>
                    <div className="sidebar__profile-myinformation">
                        <span className="sidebar__profile-myinformation-nickname">{profile.get('nickname')}</span>
                        <br></br>
                        <span className="sidebar__profile-myinformation-description">
                            {profile.get('introduction')}
                        </span>
                    </div>
                </div>
            )}
            {isAuthenticated ? (
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
                        <button onClick={isAuthenticated ? signOut : () => {}}>
                            <span>로그아웃</span>
                        </button>
                    </div>
                </div>
            ) : (
                <div className="sidebar__link">
                    <div className="sidebar__link-content">
                        <Link to="/login">로그인</Link>
                    </div>
                    <div className="sidebar__link-content">
                        <Link to="/signup">회원가입</Link>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Sidebar;
