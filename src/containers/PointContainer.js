import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as dalgonaActions from 'store/modules/dalgona';
import Point from 'components/Point';

class PointContainer extends Component {
  componentDidMount() {
    const { isAuthenticated, history } = this.props;
    if (!isAuthenticated) {
      alert('로그인이 필요합니다.');
      history.push('/login');
    } else {
      this.getMyPoint('get', 1);
    }
  }

  getMyPoint = async (type, page) => {
    const { DalgonaActions } = this.props;
    try {
      await DalgonaActions.getMyPoint(type, page);
    } catch (e) {
      console.log(`error log: ${e}`);
    }
  };

  render() {
    const { history, location, myPointCount, myPoint, myListCount } = this.props;
    return (
      <>
        <Point
          history={history}
          location={location}
          myPointCount={myPointCount}
          myListCount={myListCount}
          myPoint={myPoint}
          getMyPoint={this.getMyPoint}
        />
      </>
    );
  }
}
export default connect(
  (state) => ({
    isAuthenticated: state.auth.get('isAuthenticated'),
    myPost: state.dalgona.get('myPost'),
    myPoint: state.dalgona.get('myPoint'),
    myPointCount: state.dalgona.get('myPointCount'),
    myListCount: state.dalgona.get('myListCount'),
  }),
  (dispatch) => ({
    DalgonaActions: bindActionCreators(dalgonaActions, dispatch),
  })
)(PointContainer);
