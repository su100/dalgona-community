import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as authActions from 'store/modules/auth';
import * as dalgonaActions from 'store/modules/dalgona';
import Point from 'components/Point';

class PointContainer extends Component {
    getMyPoint = async (postId) => {
        const { DalgonaActions } = this.props;
        try {
            await DalgonaActions.getMyPoint(1);
        } catch (e) {
            console.log('error log:' + e);
        }
    };
    componentDidMount() {
        this.getMyPoint(1);
    }
    render() {
        return (
            <Fragment>
                <Point myPoint={this.props.myPoint} />
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
)(PointContainer);
