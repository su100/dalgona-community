import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as authActions from 'store/modules/auth';
import NoticePost from 'components/NoticePost';

class NoticePostContainer extends Component {
    render() {
        console.log('home container');
        return (
            <Fragment>
                <NoticePost />
            </Fragment>
        );
    }
}

export default NoticePostContainer;
