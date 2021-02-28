import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as authActions from 'store/modules/auth';
import Vote from 'components/Vote';

class VoteContainer extends Component {
    render() {
        return (
            <Fragment>
                <Vote />
            </Fragment>
        );
    }
}

export default VoteContainer;
