import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as authActions from 'store/modules/auth';
import NoticeBoard from 'components/NoticeBoard';

class NoticeBoardContainer extends Component {
    render() {
        return (
            <Fragment>
                <NoticeBoard />
            </Fragment>
        );
    }
}

export default NoticeBoardContainer;
