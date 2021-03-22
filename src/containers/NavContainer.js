import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as authActions from 'store/modules/auth';
import * as navActions from 'store/modules/nav';
import Nav from 'components/common/Nav';
import { luna } from 'store/modules';

class NavContainer extends Component {
    signOut = () => {
        this.props.AuthActions.signOut();
        this.props.history.go(); //새로고침으로 store초기화
    };

    getProfile = async () => {
        const { AuthActions } = this.props;
        try {
            await AuthActions.getProfile();
        } catch (e) {
            console.log('error log:' + e);
        }
    };

    getLunaBoard = async () => {
        const { NavActions } = this.props;
        try {
            await NavActions.getLunaBoard();
        } catch (e) {
            console.log('error log:' + e);
        }
    };
    getFreeBoard = async () => {
        const { NavActions } = this.props;
        try {
            await NavActions.getFreeBoard();
        } catch (e) {
            console.log('error log:' + e);
        }
    };
    getDalgonaBoard = async () => {
        const { NavActions } = this.props;
        try {
            await NavActions.getDalgonaBoard();
        } catch (e) {
            console.log('error log:' + e);
        }
    };
    componentDidMount() {
        if (this.props.isAuthenticated) {
            this.getProfile();
        }
        this.getLunaBoard();
        this.getFreeBoard();
        this.getDalgonaBoard();
        console.log(this.props.lunaBoard);
    }

    render() {
        const {
            history,
            location,
            isAuthenticated,
            isHome,
            isLogin,
            match,
            profile,
            lunaBoard,
            freeBoard,
            dalgonaBoard,
        } = this.props;
        return (
            <Nav
                history={history}
                location={location}
                isAuthenticated={isAuthenticated}
                signOut={this.signOut}
                isHome={isHome}
                isLogin={isLogin}
                match={match}
                profile={profile}
                lunaBoard={lunaBoard}
                freeBoard={freeBoard}
                dalgonaBoard={dalgonaBoard}
            />
        );
    }
}

export default connect(
    (state) => ({
        isAuthenticated: state.auth.get('isAuthenticated'),
        profile: state.auth.get('profile'),
        lunaBoard: state.nav.get('lunaBoard'),
        freeBoard: state.nav.get('freeBoard'),
        dalgonaBoard: state.nav.get('dalgonaBoard'),
    }),
    (dispatch) => ({
        AuthActions: bindActionCreators(authActions, dispatch),
        NavActions: bindActionCreators(navActions, dispatch),
    })
)(NavContainer);
