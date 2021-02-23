import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as authActions from 'store/modules/auth';
import Activity from 'components/Activity';

class ActivityContainer extends Component {
    render() {
        console.log('home container');
        return (
            <Fragment>
                <Activity />
            </Fragment>
        );
    }
}

export default ActivityContainer;
