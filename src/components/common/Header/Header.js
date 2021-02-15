import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import searchIcon from 'images/search.png';
import menuIcon from 'images/menu.png';
import logo from 'images/logo.png';
import './Header.scss';

class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpen: false,
            openMenu: 'home',
        };
    }

    handleOver = (e) => {
        if (e.target.id === 'home') {
            this.setState({ isOpen: false, openMenu: e.target.id });
        } else {
            this.setState({ isOpen: true, openMenu: e.target.id });
        }
    };

    handleOnClick = (e) => {
        const { openMenu } = this.state;
        if (e.target.id === openMenu || e.target.id === 'home') {
            this.setState({ isOpen: false, openMenu: e.target.id });
        } else {
            this.setState({ isOpen: true, openMenu: e.target.id });
        }
    };

    render() {
        const { isOpen, openMenu } = this.state;
        const Menu = { home: '홈', main: '메인', luna: '루나', free: '자유', dalgona: '달고나' };
        return (
            <div className="header">
                <div className="header-main">
                    <div className="header-main__logo">
                        <img className="header-main__logo-menu" src={menuIcon}></img>
                        <img className="header-main__logo-logoimg" src={logo}></img>
                        <img className="header-main__logo-search" src={searchIcon}></img>
                    </div>
                    <div className="header-main__login">
                        <Link>
                            <span className="header-main__login-login">로그인</span>
                        </Link>
                        <Link>
                            <span className="header-main__login-signup">회원가입</span>
                        </Link>
                    </div>
                    <div className="header-main__menu">
                        {Object.keys(Menu).map((value, index) => (
                            <div
                                className={
                                    openMenu === value ? 'header-main__menu-content click' : 'header-main__menu-content'
                                }
                                id={value}
                                key={index}
                                onMouseOver={this.handleOver}
                                onClick={this.handleOnClick}
                            >
                                {Menu[value]}
                            </div>
                        ))}
                        <input></input>
                    </div>
                </div>
                {isOpen && (
                    <div className="header-hover">
                        <div className="header-hover__border"></div>
                        <div className="header-hover__menu">
                            {openMenu === 'main' && (
                                <div className="header-hover__menu-content">
                                    <span> 기사</span>
                                    <span>투표</span>
                                </div>
                            )}
                            {openMenu === 'luna' && (
                                <div className="header-hover__menu-content">
                                    <span> 비투비</span>
                                    <span>스키니브라운</span>
                                    <span>아이유</span>
                                </div>
                            )}
                            {openMenu === 'free' && (
                                <div className="header-hover__menu-content">
                                    <span> 일상 / 잡담</span>
                                    <span>취미</span>
                                    <span>생활정보</span>
                                    <span>고민</span>
                                </div>
                            )}
                            {openMenu === 'dalgona' && (
                                <div className="header-hover__menu-content">
                                    <span> 공지사항</span>
                                    <span>이벤트</span>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>
        );
    }
}

export default Header;
