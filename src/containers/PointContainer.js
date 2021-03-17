import React, { Component, Fragment } from 'react';
import queryString from 'query-string';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as authActions from 'store/modules/auth';
import * as dalgonaActions from 'store/modules/dalgona';
import Point from 'components/Point';

class PointContainer extends Component {
    getMyPoint = async (type, page) => {
        const { DalgonaActions } = this.props;
        try {
            await DalgonaActions.getMyPoint(type, page);
        } catch (e) {
            console.log('error log:' + e);
        }
    };

    componentDidMount() {
        if (!this.props.isAuthenticated) {
            alert('로그인이 필요합니다.');
            this.props.history.push('/login');
        } else {
            this.getMyPoint('get', 1);
            console.log('mypointcontainer');
        }
    }
    render() {
        const { history, location, myPointCount, myPoint } = this.props;
        return (
            <Fragment>
                <Point
                    history={history}
                    location={location}
                    myPointCount={myPointCount}
                    myPoint={myPoint}
                    getMyPoint={this.getMyPoint}
                />
            </Fragment>
        );
    }
}
export default connect(
    (state) => ({
        isAuthenticated: state.auth.get('isAuthenticated'),
        myPost: state.dalgona.get('myPost'),
        myPoint: state.dalgona.get('myPoint'),
        myPointCount: state.dalgona.get('myPointCount'),
    }),
    (dispatch) => ({
        DalgonaActions: bindActionCreators(dalgonaActions, dispatch),
    })
)(PointContainer);
