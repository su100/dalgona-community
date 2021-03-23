import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import logo from 'images/logo.png';
import avatarbox from 'images/avatarbox.png';
import './Sidebar.scss';

const Sidebar = ({ handleSidebar, isAuthenticated, profile, signOut, closeSidebar, openSidebar }) => {
    const modalEl = useRef();
    const handleClickOutside = (e) => {
        if (modalEl.current && openSidebar && !modalEl.current.contains(e.target)) closeSidebar();
    };

    useEffect(() => {
        window.addEventListener('click', handleClickOutside);
        return () => {
            window.removeEventListener('click', handleClickOutside);
        };
    }, []);

    return (
        <div className="sidebar">
            <div className="sidebar-style" ref={modalEl}>
                <div className="sidebar-style__header">
                    <img src={logo} />
                </div>
                {isAuthenticated && (
                    <div className="sidebar-style__profile">
                        <div className="sidebar-style__profile-img">
                            <img src={profile.get('profile_image') ? profile.get('profile_image') : avatarbox}></img>
                        </div>
                        <div className="sidebar-style__profile-myinformation">
                            <span className="sidebar-style__profile-myinformation-nickname">
                                {profile.get('nickname')}
                            </span>
                            <br></br>
                            <span className="sidebar-style__profile-myinformation-description">
                                {profile.get('introduction')}
                            </span>
                        </div>
                    </div>
                )}
                {isAuthenticated ? (
                    <div className="sidebar-style__link">
                        <div className="sidebar-style__link-content">
                            <Link to="/my/profile">프로필 수정</Link>
                        </div>
                        <div className="sidebar-style__link-content">
                            <Link to="/my/activity">활동내역</Link>
                        </div>
                        <div className="sidebar-style__link-content">
                            <Link to="/my/point">별내역</Link>
                        </div>
                        <div className="sidebar-style__link-content">
                            <button onClick={isAuthenticated ? signOut : () => {}}>
                                <span>로그아웃</span>
                            </button>
                        </div>
                    </div>
                ) : (
                    <div className="sidebar-style__link">
                        <div className="sidebar-style__link-content">
                            <Link to="/login">로그인</Link>
                        </div>
                        <div className="sidebar-style__link-content">
                            <Link to="/signup">회원가입</Link>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Sidebar;
