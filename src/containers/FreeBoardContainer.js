import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as authActions from 'store/modules/auth';
import FreeBoard from 'components/FreeBoard';

class FreeBoardContainer extends Component {
    render() {
        console.log('home container');
        return (
            <Fragment>
                <FreeBoard />
            </Fragment>
        );
    }
}

export default FreeBoardContainer;
