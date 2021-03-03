import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as authActions from 'store/modules/auth';
import EventBoard from 'components/EventBoard';

class EventBoardContainer extends Component {
    render() {
        console.log('home container');
        return (
            <Fragment>
                <EventBoard />
            </Fragment>
        );
    }
}

export default EventBoardContainer;
