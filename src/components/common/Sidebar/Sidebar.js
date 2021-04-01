import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import logo from 'images/logo.png';
import avatarbox from 'images/avatarbox.png';
import './Sidebar.scss';

const Sidebar = ({ isAuthenticated, profile, signOut, closeSidebar, openSidebar }) => {
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
                        <img
                            className="sidebar-style__profile-img"
                            src={profile.get('profile_image') ? profile.get('profile_image') : avatarbox}
                        />
                        <div className="sidebar-style__profile-myinformation">
                            <div className="sidebar-style__profile-myinformation-nickname">
                                {profile.get('nickname')}
                            </div>
                            <div className="sidebar-style__profile-myinformation-description">
                                {profile.get('introduction')}
                            </div>
                        </div>
                    </div>
                )}
                {isAuthenticated ? (
                    <div className="sidebar-style__link">
                        <Link to="/my/profile" className="sidebar-style__link-content">
                            프로필 수정
                        </Link>
                        <Link to="/my/activity" className="sidebar-style__link-content">
                            활동내역
                        </Link>
                        <Link to="/my/point" className="sidebar-style__link-content">
                            별내역
                        </Link>
                        <button onClick={isAuthenticated ? signOut : () => {}} className="sidebar-style__link-content">
                            로그아웃
                        </button>
                    </div>
                ) : (
                    <div className="sidebar-style__link">
                        <Link to="/login" className="sidebar-style__link-content">
                            로그인
                        </Link>
                        <Link to="/signup" className="sidebar-style__link-content">
                            회원가입
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Sidebar;
