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
    NotFoundPage,
} from 'pages';

import './App.scss';

class App extends Component {
    constructor(props) {
        super(props);
        const { AuthActions } = props;
        AuthActions.setAuth();
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
                    <Route exact path="/luna/:board_url/:postid" component={LunaPostPage} />
                    <Route exact path="/write/:category" component={WritePage} />
                    <Route exact path="/free/:category" component={FreeBoardPage} />
                    <Route exact path="/free/:category/:postid" component={FreePostPage} />
                    <Route exact path="/notice" component={NoticeBoardPage} />
                    <Route exact path="/notice/:noticeid" component={NoticePostPage} />
                    <Route exact path="/event" component={EventBoardPage} />
                    <Route exact path="/event/:eventid" component={EventPostPage} />
                    <Route exact path="/my/profile" component={ProfilePage} />
                    <Route exact path="/my/activity" component={ActivityPage} />
                    <Route exact path="/my/point" component={PointPage} />
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
