import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as authActions from 'store/modules/auth';

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
        window.addEventListener('storage', (event) => {
            const credentials = window.sessionStorage.getItem('__AUTH__');
            //다른 새 탭 열리고 token이 sessionStorage에 있을 때

            if (event.key === 'REQUESTING_SHARED_CREDENTIALS' && credentials) {
                //localStorage에 복사했다가 지움
                window.localStorage.setItem('CREDENTIALS_SHARING', credentials);
                window.localStorage.removeItem('CREDENTIALS_SHARING');
            }

            //새 탭 기준: 위의 조건문 돌면 session에 복사
            if (event.key === 'CREDENTIALS_SHARING' && !credentials) {
                window.sessionStorage.setItem('__AUTH__', event.newValue);
                //token 복사 후 setAuth, getProfile
                const { AuthActions } = props;
                AuthActions.setAuth();
            }
        });
    }

    componentDidMount() {
        window.localStorage.setItem('REQUESTING_SHARED_CREDENTIALS', Date.now().toString());
        window.localStorage.removeItem('REQUESTING_SHARED_CREDENTIALS');
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
                    <Route exact path="/article" component={ArticlePage} />
                    <Route exact path="/vote" component={VoteBoardPage} />
                    <Route exact path="/vote/:voteid" component={VotePage} />
                    <Route exact path="/luna/:board_url" component={LunaBoardPage} />
                    <Route exact path="/luna/write/:board_url" component={WritePage} />
                    <Route exact path="/luna/:board_url/:postid" component={LunaPostPage} />
                    <Route exact path="/free/:board_url" component={FreeBoardPage} />
                    <Route exact path="/free/write/:board_url" component={WritePage} />
                    <Route exact path="/free/:board_url/:postid" component={FreePostPage} />
                    <Route exact path="/notice" component={NoticeBoardPage} />
                    <Route exact path="/notice/:noticeid" component={NoticePostPage} />
                    <Route exact path="/event" component={EventBoardPage} />
                    <Route exact path="/event/:eventid" component={EventPostPage} />
                    <Route exact path="/my/profile" component={ProfilePage} />
                    <Route exact path="/my/activity" component={ActivityPage} />
                    <Route exact path="/my/point" component={PointPage} />
                    <Route exact path="/policy/:type" component={PolicyPage} />
                    <Route path="/" component={NotFoundPage} />
                </Switch>
            </div>
        );
    }
}

export default connect(
    (state) => ({}),
    (dispatch) => ({
        AuthActions: bindActionCreators(authActions, dispatch),
    })
)(App);
