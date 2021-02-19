import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as authActions from 'store/modules/auth';
import FindId from 'components/FindId';

class FindIdContainer extends Component {
    render() {
        return (
            <Fragment>
                <FindId history={this.props.history} />
            </Fragment>
        );
    }
}

export default FindIdContainer;
