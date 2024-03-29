import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as authActions from 'store/modules/auth';
import { Storage } from 'lib/storage';
import { getToken } from 'lib/api';

import {
  HomePage,
  SearchPage,
  LoginPage,
  SignUpPage,
  FindIdPage,
  FindPwPage,
  ArticlePage,
  VoteBoardPage,
  VotePage,
  LunaBoardPage,
  LunaPostPage,
  WritePage,
  FreeBoardPage,
  FreePostPage,
  NoticeBoardPage,
  NoticePostPage,
  EventBoardPage,
  EventPostPage,
  ProfilePage,
  ActivityPage,
  PointPage,
  PolicyPage,
  NotFoundPage,
} from 'pages';

import './App.scss';

class App extends Component {
  constructor(props) {
    super(props);
    const { AuthActions } = props;
    AuthActions.setAuth();
  }

  componentDidMount() {
    const { AuthActions } = this.props;

    window.addEventListener('storage', (event) => {
      const credentials = getToken();
      if (event.key === 'LOGIN' && event.newValue) {
        // 로그인했는데 현재 탭 토큰과 다른 토큰이 들어오면
        const [type, value] = JSON.parse(event.newValue).split('|');
        if (credentials !== value) {
          Storage[type].set('__AUTH__', value);
        }
        window.location.reload();
      }

      // 다른 새 탭 열리고 token이 sessionStorage에 있을 때
      if (event.key === 'REQUESTING_SHARED_CREDENTIALS' && credentials) {
        // localStorage에 복사했다가 지움
        Storage.local.set('CREDENTIALS_SHARING', credentials);
        Storage.local.remove('CREDENTIALS_SHARING');
      }

      // 새 탭 기준: 위의 조건문 돌면 session에 복사
      if (event.key === 'CREDENTIALS_SHARING' && !credentials) {
        Storage.session.set('__AUTH__', JSON.parse(event.newValue));
        AuthActions.setAuth();
      }

      if (event.key === 'REMOVE_CREDENTIALS' && credentials) {
        // 다른 탭에서 로그아웃 시 현재 탭에서도 로그아웃
        AuthActions.signOut();
      }

      if (event.key === '__AUTH__' && event.newValue === null) {
        // 자동로그인 후 로그아웃시 새로고침
        window.location.reload();
      }
    });

    const token = getToken();

    /* 새로고침 혹은 새 탭 */
    // 이미 token이 있는 경우 다른 탭에 알리지 않음
    if (token) {
      // 현재 탭에 이미 token이 존재하면
      AuthActions.setAuth();
    } else {
      // 현재 App이 새 탭에서 실행된 경우
      Storage.local.set('REQUESTING_SHARED_CREDENTIALS', Date.now().toString());
      Storage.local.remove('REQUESTING_SHARED_CREDENTIALS');
    }
  }

  render() {
    return (
      <div className="App">
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route exact path="/search" component={SearchPage} />
          <Route exact path="/login" component={LoginPage} />
          <Route exact path="/signup" component={SignUpPage} />
          <Route exact path="/find/id" component={FindIdPage} />
          <Route exact path="/find/pw" component={FindPwPage} />
          <Route exact path="/issue/article" component={ArticlePage} />
          <Route exact path="/issue/vote" component={VoteBoardPage} />
          <Route exact path="/issue/vote/:voteid" component={VotePage} />
          <Route exact path="/luna/:board_url" component={LunaBoardPage} />
          <Route exact path="/free/:board_url" component={FreeBoardPage} />
          <Route exact path="/dalgona/notice" component={NoticeBoardPage} />
          <Route exact path="/dalgona/event" component={EventBoardPage} />
          <Route exact path="/my/profile" component={ProfilePage} />
          <Route exact path="/my/activity" component={ActivityPage} />
          <Route exact path="/my/point" component={PointPage} />
          <Route exact path="/policy/:type" component={PolicyPage} />
          <Route exact path="/(luna|free|dalgona)/:board_url?/write" component={WritePage} />
          <Route exact path="/luna/:board_url/:postid" component={LunaPostPage} />
          <Route exact path="/free/:board_url/:postid" component={FreePostPage} />
          <Route exact path="/dalgona/notice/:noticeid" component={NoticePostPage} />
          <Route exact path="/dalgona/event/:eventid" component={EventPostPage} />
          <Route exact path="/password-reset-confirm/:uidb64/:token" component={FindPwPage} />
          <Route path="/" component={NotFoundPage} />
        </Switch>
      </div>
    );
  }
}

export default connect(
  (state) => ({ state }),
  (dispatch) => ({
    AuthActions: bindActionCreators(authActions, dispatch),
  })
)(App);
