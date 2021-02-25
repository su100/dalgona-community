import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as authActions from 'store/modules/auth';
import Point from 'components/Point';

class PointContainer extends Component {
    render() {
        console.log('home container');
        return (
            <Fragment>
                <Point />
            </Fragment>
        );
    }
}

export default PointContainer;
