import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as authActions from 'store/modules/auth';
import VoteBoard from 'components/VoteBoard';

class VoteBoardContainer extends Component {
    render() {
        console.log('home container');
        return (
            <Fragment>
                <VoteBoard />
            </Fragment>
        );
    }
}

export default VoteBoardContainer;
