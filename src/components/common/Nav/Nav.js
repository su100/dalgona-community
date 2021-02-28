import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Sidebar from 'components/common/Sidebar';
import searchIcon from 'images/search.png';
import menuIcon from 'images/menu.png';
import logo from 'images/logo.png';
import biglogo from 'images/biglogo.png';
import './Nav.scss';

class Nav extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpen: false,
            openMenu: 'home',
            isPC: true,
            _ismounted: false,
            openSidebar: false,
            isLogin: false,
            path: '',
        };
    }

    handleOver = (e) => {
        if (this._isMounted) {
            if (e.target.id === 'home') {
                this.setState({ isOpen: false, openMenu: e.target.id });
            } else {
                this.setState({ isOpen: true, openMenu: e.target.id });
            }
        }
    };

    handleOnClick = (e) => {
        const { openMenu, isOpen } = this.state;
        if (this._isMounted) {
            if (e.target.id === openMenu) {
                this.setState({ isOpen: !isOpen, openMenu: e.target.id });
            } else if (e.target.id === 'home') {
                this.setState({ isOpen: false, openMenu: e.target.id });
                this.goHome();
            } else {
                this.setState({ isOpen: true, openMenu: e.target.id });
            }
        }
        console.log(e.target.id);
    };

    checkIsPc = () => {
        if (window.innerWidth > 1024 && this._isMounted) {
            this.setState({ isPC: true });
        } else {
            if (this._isMounted) {
                this.setState({ isPC: false });
            }
        }
    };

    goHome = () => {
        this.props.history.push('/');
    };

    setPath = () => {
        let path = this.props.location.path;
        this.setState({ path: path });
    };

    handleSidebar = () => {
        const { openSidebar } = this.state;
        this.setState({ openSidebar: !openSidebar });
    };

    componentDidMount() {
        this._isMounted = true;
        this.checkIsPc();
        this.setPath();
        window.addEventListener('resize', this.checkIsPc);
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    render() {
        const { isOpen, openMenu, isPC, openSidebar, isLogin, path } = this.state;
        const { isHome } = this.props;
        const Menu = { home: '홈', main: '이슈', Luna: '루나', free: '자유', dalgona: '달고나' };

        return (
            <div className={!openSidebar ? 'nav' : 'nav sidebaropen'}>
                {openSidebar && (
                    <div className="nav sidebaropen sidebar">
                        <Sidebar handleSidebar={this.handleSidebar} isLogin={isLogin} />
                    </div>
                )}
                <div className={isHome ? 'nav-main' : 'nav-main no'}>
                    <div className="nav-main__logo">
                        <div className="not-pc">
                            <img className="nav-main__logo-menu" src={menuIcon} onClick={this.handleSidebar}></img>
                        </div>
                        <div className="nav-main__logo-logoimg" onClick={this.goHome}>
                            <img src={isPC ? biglogo : logo}></img>
                        </div>
                        <div className="not-pc">
                            <img className="nav-main__logo-search" src={searchIcon}></img>
                        </div>
                    </div>
                    <div className="nav-main__login">
                        <Link to={{ pathname: '/login', path: 'login' }}>
                            <span
                                className={path === 'login' ? 'nav-main__login-login click' : 'nav-main__login-login'}
                            >
                                로그인
                            </span>
                        </Link>
                        <Link to={{ pathname: '/signup', path: 'signup' }}>
                            <span
                                className={
                                    path === 'signup' ? 'nav-main__login-signup click' : 'nav-main__login-signup'
                                }
                            >
                                회원가입
                            </span>
                        </Link>
                    </div>
                    {(isHome || isPC) && (
                        <div className="nav-main__menu">
                            {Object.keys(Menu).map((value, index) => (
                                <div
                                    className={
                                        openMenu === value ? 'nav-main__menu-content click' : 'nav-main__menu-content'
                                    }
                                    id={value}
                                    key={index}
                                    onMouseOver={this.handleOver}
                                    onClick={this.handleOnClick}
                                >
                                    {Menu[value]}
                                </div>
                            ))}
                            <div className="nav-main__menu-input">
                                <input></input>
                            </div>
                        </div>
                    )}
                </div>
                {isOpen && (
                    <div className="nav-hover">
                        <div className="nav-hover__border"></div>
                        <div className="nav-hover__menu">
                            {isPC && <div className="nav-hover__menu-home"></div>}
                            {(isPC || openMenu === 'main') && (
                                <div className="nav-hover__menu-main">
                                    <Link to={{ pathname: '/article', path: 'main' }}>
                                        <span> 기사</span>
                                    </Link>
                                    <Link to={{ pathname: '/vote', path: 'main' }}>
                                        <span>투표</span>
                                    </Link>
                                </div>
                            )}
                            {(isPC || openMenu === 'Luna') && (
                                <div className="nav-hover__menu-luna">
                                    <Link to={{ pathname: '/luna/1', path: 'Luna' }}>
                                        <span> 비투비</span>
                                    </Link>
                                    <span>스키니브라운</span>
                                    <span>아이유</span>
                                </div>
                            )}
                            {(isPC || openMenu === 'free') && (
                                <div className="nav-hover__menu-free">
                                    <Link to={{ pathname: '/free/1', path: 'free' }}>
                                        <span> 일상 / 잡담</span>
                                    </Link>
                                    <span>취미</span>
                                    <span>생활정보</span>
                                    <span>고민</span>
                                </div>
                            )}
                            {(isPC || openMenu === 'dalgona') && (
                                <div className="nav-hover__menu-dalgona">
                                    <Link to={{ pathname: '/notice', path: 'dalgona' }}>
                                        <span> 공지사항</span>
                                    </Link>
                                    <Link to={{ pathname: '/event', path: 'dalgona' }}>
                                        <span>이벤트</span>
                                    </Link>
                                </div>
                            )}
                            {isPC && <div className="nav-hover__menu-dummy"></div>}
                        </div>
                    </div>
                )}
            </div>
        );
    }
}

export default Nav;
