import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Sidebar from 'components/common/Sidebar';
import SearchInput from 'components/common/SearchInput';
import SearchBox from 'components/common/SearchBox';
import Modal from 'components/common/Modal';
import searchIcon from 'images/searchIcon.png';
import menuIcon from 'images/menu.png';
import logo from 'images/logo.png';
import biglogo from 'images/biglogo.png';
import './Nav.scss';

class Nav extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      openMenu: '',
      isPC: false,
      openSidebar: false,
      path: '',
      isSearch: false,
      searchWord: '',
      searchDivision: 'all',
      isModal: false,
      modalType: '',
      modalMessage: '',
      confirmFunction: () => {},
    };
  }

  componentDidMount() {
    this.checkIsPc();
    this.setPath();
    window.addEventListener('resize', this.checkIsPc);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.checkIsPc);
  }

  handleOver = (e) => {
    if (e.target.id === 'home') {
      this.setState({ isOpen: false, openMenu: e.target.id });
    } else {
      this.setState({ isOpen: true, openMenu: e.target.id });
    }
  };

  closeMenu = () => {
    const { isOpen } = this.state;
    this.setState({ isOpen: !isOpen });
  };

  handleOpenMenu = () => {
    this.setState({ isOpen: true });
  };

  handleChange = (e) => {
    this.setState({ [e.target.id]: e.target.value });
  };

  handleOnClick = (e) => {
    const { history } = this.props;
    const { openMenu, isOpen } = this.state;
    if (e.target.id === openMenu) {
      this.setState({ isOpen: !isOpen, openMenu: e.target.id });
    } else if (e.target.id === 'home') {
      this.setState({ isOpen: false, openMenu: e.target.id });
      history.push('/');
    } else {
      this.setState({ isOpen: true, openMenu: e.target.id });
    }
  };

  checkIsPc = () => {
    if (window.innerWidth > 1022) {
      this.setState({ isPC: true });
    } else {
      this.setState({ isPC: false });
    }
  };

  setPath = () => {
    const { location } = this.props;
    const { pathname, path } = location;
    const tmp = pathname.split('/');
    this.setState({ path, openMenu: tmp[1] });
  };

  handleSidebar = () => {
    const { openSidebar } = this.state;
    this.setState({ openSidebar: !openSidebar });
  };

  closeSidebar = () => {
    this.setState({ openSidebar: false });
  };

  signOut = () => {
    const { signOut } = this.props;
    this.setState({
      isModal: true,
      modalType: 'confirm',
      modalMessage: '로그아웃 하시겠습니까?',
      confirmFunction: () => signOut(),
    });
  };

  toggleSearch = () => {
    const { isSearch } = this.state;
    this.setState({ isSearch: !isSearch });
  };

  getSearch = () => {
    const { history } = this.props;
    const { searchWord, searchDivision } = this.state;
    history.push(`/search?searchWord=${searchWord}&searchDivision=${searchDivision}`);
  };

  closeModal = () => {
    // isModal, modalType, modalMessage 초기화
    this.setState({ isModal: false, modalType: '', modalMessage: '', confirmFunction: () => {} });
  };

  confirmModal = () => {
    const { confirmFunction } = this.state;
    confirmFunction();
    this.closeModal();
  };

  render() {
    const {
      isSearch,
      searchWord,
      searchDivision,
      isOpen,
      openMenu,
      isPC,
      openSidebar,
      path,
      isModal,
      modalType,
      modalMessage,
    } = this.state;
    const { history, isAuthenticated, profile, lunaBoard, freeBoard, dalgonaBoard, isHome } = this.props;
    const Menu = { issue: '이슈', luna: '루나', free: '자유', dalgona: '달고나' };
    return (
      <div className={!openSidebar ? 'nav' : 'nav sidebaropen'}>
        {openSidebar && (
          <div className="nav sidebaropen sidebar">
            <Sidebar
              handleSidebar={this.handleSidebar}
              isAuthenticated={isAuthenticated}
              profile={profile}
              signOut={this.signOut}
              openSidebar={openSidebar}
              closeSidebar={this.closeSidebar}
            />
          </div>
        )}
        <div className={isHome ? 'nav-main' : 'nav-main no'}>
          <div className="nav-main__logo">
            <button className="not-pc" onClick={this.handleSidebar}>
              <img className="nav-main__logo-menu" src={menuIcon} alt=" " />
            </button>
            <Link to="/" className="nav-main__logo-logoimg">
              <img src={isPC ? biglogo : logo} alt=" " />
            </Link>
            <div className="not-pc">
              <button onClick={this.toggleSearch}>
                <img className="nav-main__logo-search" src={searchIcon} alt=" " />
              </button>
            </div>
          </div>
          {isAuthenticated ? (
            <div className="nav-main__login" onMouseOver={this.handleOver} onFocus={this.handleOver}>
              {profile.get('nickname')}
              {'님'}
            </div>
          ) : (
            <div className="nav-main__login">
              <Link to={{ pathname: '/login', path: 'login', state: { prevPath: history.location?.pathname } }}>
                <span className={path === 'login' ? 'nav-main__login-login click' : 'nav-main__login-login'}>
                  로그인
                </span>
              </Link>
              <Link to={{ pathname: '/signup', path: 'signup' }}>
                <span className={path === 'signup' ? 'nav-main__login-signup click' : 'nav-main__login-signup'}>
                  회원가입
                </span>
              </Link>
            </div>
          )}
          {(isHome || isPC) && (
            <div className="nav-main__menu">
              {Object.keys(Menu).map((value) => (
                <button
                  className={openMenu === value ? 'nav-main__menu-content click' : 'nav-main__menu-content'}
                  id={value}
                  key={value}
                  onMouseOver={isPC ? this.handleOver : undefined}
                  onClick={this.handleOnClick}
                  onFocus={isPC ? this.handleOver : undefined}
                >
                  {Menu[value]}
                </button>
              ))}
              <div className="nav-main__menu-input">
                <SearchInput
                  isNavPC
                  searchWord={searchWord}
                  placeholder=""
                  handleChange={this.handleChange}
                  getSearch={this.getSearch}
                />
              </div>
            </div>
          )}
        </div>
        {isOpen && (
          <div className="nav-hover" onMouseLeave={this.closeMenu}>
            <div className="nav-hover__border">
              {isAuthenticated && (
                <div className="nav-hover__border-authenticated">
                  <Link to="/my/profile">
                    <span>프로필 수정</span>
                  </Link>
                  <Link to="/my/activity">
                    <span>활동내역</span>
                  </Link>
                  <Link to="/my/point">
                    <span>별 내역</span>
                  </Link>
                  <button onClick={isAuthenticated ? this.signOut : () => {}}>
                    <span>로그아웃</span>
                  </button>
                </div>
              )}
            </div>
            <div className="nav-hover__menu">
              {(isPC || openMenu === 'issue') && (
                <div className="nav-hover__menu-col">
                  <Link to={{ pathname: '/issue/article', path: 'issue' }}>
                    <span> 기사</span>
                  </Link>
                  <Link to={{ pathname: '/issue/vote', path: 'issue' }}>
                    <span>투표</span>
                  </Link>
                </div>
              )}
              {(isPC || openMenu === 'luna') && (
                <div className="nav-hover__menu-col">
                  {lunaBoard.map((board) => (
                    <Link key={board.board_url} to={{ pathname: `/luna/${board.board_url}`, path: 'luna' }}>
                      <span>{board.board_name}</span>
                    </Link>
                  ))}
                </div>
              )}
              {(isPC || openMenu === 'free') && (
                <div className="nav-hover__menu-col">
                  {freeBoard.map((board) => (
                    <Link key={board.board_url} to={{ pathname: `/free/${board.board_url}`, path: 'free' }}>
                      <span>{board.board_name}</span>
                    </Link>
                  ))}
                </div>
              )}
              {(isPC || openMenu === 'dalgona') && (
                <div className="nav-hover__menu-col">
                  {dalgonaBoard.map((board) => (
                    <Link key={board.board_url} to={{ pathname: `/dalgona/${board.board_url}`, path: 'dalgona' }}>
                      <span>{board.board_name}</span>
                    </Link>
                  ))}
                </div>
              )}
              {isPC && <div className="nav-hover__menu-dummy" />}
            </div>
          </div>
        )}
        {isSearch && (
          <div className="nav-search__box not-pc">
            <SearchBox
              searchWord={searchWord}
              searchDivision={searchDivision}
              handleChange={this.handleChange}
              placeholder="검색어를 입력하세요. (제목 + 내용)"
              getSearch={this.getSearch}
            />
            <div className="border_line" />
          </div>
        )}
        {isModal && (
          <Modal
            type={modalType}
            message={modalMessage}
            closeModal={this.closeModal}
            confirmModal={this.confirmModal}
          />
        )}
      </div>
    );
  }
}

export default Nav;
