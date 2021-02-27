import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as authActions from 'store/modules/auth';
import VoteList from 'components/VoteList';

class VoteListContainer extends Component {
    render() {
        console.log('home container');
        return (
            <Fragment>
                <VoteList />
            </Fragment>
        );
    }
}

export default VoteListContainer;
