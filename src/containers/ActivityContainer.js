import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as authActions from 'store/modules/auth';
import * as dalgonaActions from 'store/modules/dalgona';
import Activity from 'components/Activity';

class ActivityContainer extends Component {
    getMyPost = async (postId) => {
        const { DalgonaActions } = this.props;
        try {
            await DalgonaActions.getMyPost(1);
        } catch (e) {
            console.log('error log:' + e);
        }
    };
    componentDidMount() {
        this.getMyPost(1);
    }
    render() {
        return (
            <Fragment>
                <Activity myPost={this.props.myPost} />
            </Fragment>
        );
    }
}

export default connect(
    (state) => ({
        myPost: state.dalgona.get('myPost'),
        myPoint: state.dalgona.get('myPoint'),
    }),
    (dispatch) => ({
        DalgonaActions: bindActionCreators(dalgonaActions, dispatch),
    })
)(ActivityContainer);
