import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as authActions from 'store/modules/auth';
import SignUp from 'components/SignUp';

class SignUpContainer extends Component {
    render() {
        return (
            <Fragment>
                <SignUp history={this.props.history} location={this.props.location} />
            </Fragment>
        );
    }
}

export default SignUpContainer;
