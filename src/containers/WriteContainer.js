import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as authActions from 'store/modules/auth';
import Write from 'components/Write';

class WriteContainer extends Component {
    render() {
        console.log('home container');
        return (
            <Fragment>
                <Write history={this.props.history} />
            </Fragment>
        );
    }
}

export default WriteContainer;
