import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as authActions from 'store/modules/auth';
import LunaPost from 'components/LunaPost';

class LunaPostContainer extends Component {
    render() {
        console.log('home container');
        return (
            <Fragment>
                <LunaPost />
            </Fragment>
        );
    }
}

export default LunaPostContainer;
