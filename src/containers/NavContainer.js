import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as authActions from 'store/modules/auth';
import Nav from 'components/common/Nav';

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

    componentDidMount() {
        if (this.props.isAuthenticated) {
            this.getProfile();
            console.log(this.props.profile);
        }
    }

    render() {
        const { history, location, isAuthenticated, isHome, isLogin, match, profile, AuthActions } = this.props;
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
            />
        );
    }
}

export default connect(
    (state) => ({
        isAuthenticated: state.auth.get('isAuthenticated'),
        profile: state.auth.get('profile'),
    }),
    (dispatch) => ({
        AuthActions: bindActionCreators(authActions, dispatch),
    })
)(NavContainer);
