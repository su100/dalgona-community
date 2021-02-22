import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as authActions from 'store/modules/auth';
import Profile from 'components/Profile';

class ProfileContainer extends Component {
    render() {
        console.log('home container');
        return (
            <Fragment>
                <Profile />
            </Fragment>
        );
    }
}

export default ProfileContainer;
