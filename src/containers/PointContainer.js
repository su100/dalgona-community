import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as dalgonaActions from 'store/modules/dalgona';
import Point from 'components/Point';
import { getMyPoint } from 'lib/api';
import { List } from 'immutable';

class PointContainer extends Component {
  constructor() {
    super();
    this.state = {
      currentType: 'get',
      myGetPoint: null,
      myUsePoint: null,
      myLosePoint: null,
      myPointCount: 0,
      myListCount: 0,
    };
    this.type = {
      get: 'myGetPoint',
      use: 'myUsePoint',
      lose: 'myLosePoint',
    };
  }

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
    const myPoint = this.type[type];
    const { state } = this;
    this.setState({ currentType: type });
    if (state[myPoint]) return;
    try {
      const { data } = await getMyPoint(type, page);
      const { results, total, count } = data;
      const myPointList = {};
      for (let i = 0; i < results.length; i++) {
        const date = results[i].created_at.substring(0, 10);
        if (Object.keys(myPointList).includes(date)) {
          myPointList[date] = myPointList[date].push(results[i]);
        } else {
          myPointList[date] = List([results[i]]);
        }
      }
      this.setState({ myPointCount: total, [myPoint]: myPointList, myListCount: count });
    } catch (e) {
      console.log(`error log: ${e}`);
    }
  };

  render() {
    const { state, props, type } = this;
    const { history, location } = props;
    const { currentType, myPointCount, myListCount } = state;
    const myPoint = type[currentType];
    return (
      <>
        <Point
          history={history}
          location={location}
          myPointCount={myPointCount}
          myListCount={myListCount}
          myPoint={state[myPoint]}
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
