import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as authActions from 'store/modules/auth';
import * as freeActions from 'store/modules/free';
import Write from 'components/Write';

class WriteContainer extends Component {
    addPostImage = async (formdata, func) => {
        const { FreeActions } = this.props;
        try {
            await FreeActions.addPostImage(formdata);
        } catch (e) {
            console.log('error log:' + e);
        }
        func(this.props.imageURL);
    };
    render() {
        return (
            <Fragment>
                <Write history={this.props.history} addPostImage={this.addPostImage} />
            </Fragment>
        );
    }
}
export default connect(
    (state) => ({
        imageURL: state.free.get('imageURL'),
        loading: state.pender.pending['free/ADD_POST_IMAGE'],
        img_success: state.pender.success['free/ADD_POST_IMAGE'],
    }),
    (dispatch) => ({
        FreeActions: bindActionCreators(freeActions, dispatch),
    })
)(WriteContainer);
