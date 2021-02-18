import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as authActions from 'store/modules/auth';
import Login from 'components/Login';

class LoginContainer extends Component {
    render() {
        console.log('home container');
        return (
            <Fragment>
                <Login />
            </Fragment>
        );
    }
}

export default LoginContainer;
