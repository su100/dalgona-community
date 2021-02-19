import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as authActions from 'store/modules/auth';
import FindPw from 'components/FindPw';

class FindPwContainer extends Component {
    render() {
        console.log('home container');
        return (
            <Fragment>
                <FindPw history={this.props.history} />
            </Fragment>
        );
    }
}

export default FindPwContainer;
