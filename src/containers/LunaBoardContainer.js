import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as authActions from 'store/modules/auth';
import LunaBoard from 'components/LunaBoard';

class LunaBoardContainer extends Component {
    render() {
        console.log('home container');
        return (
            <Fragment>
                <LunaBoard />
            </Fragment>
        );
    }
}

export default LunaBoardContainer;
