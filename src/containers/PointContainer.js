import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as dalgonaActions from 'store/modules/dalgona';
import Point from 'components/Point';
import { getMyPoint } from 'lib/api';
import { List } from 'immutable';
import Modal from 'components/common/Modal';

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
      isModal: false,
      modalType: '',
      modalMessage: '',
      modalFunction: () => {},
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
      this.setState({
        isModal: true,
        modalType: 'alert',
        modalMessage: '로그인이 필요합니다.',
        modalFunction: () => history.push('/login'),
      });
    } else {
      this.getMyPoint('get', 1);
    }
  }

  getMyPoint = async (type, page) => {
    const pointType = this.type[type];
    this.setState({ currentType: type });

    // if (state[pointType]) return;
    try {
      const { data } = await getMyPoint(type, page);
      const { results, total, count } = data;
      const myPointList = {};
      results.forEach((result) => {
        const date = result.created_at.substring(0, 10);
        if (Object.keys(myPointList).includes(date)) {
          myPointList[date] = myPointList[date].push(result);
        } else {
          myPointList[date] = List([result]);
        }
      });

      this.setState({ myPointCount: total, [pointType]: myPointList, myListCount: count });
    } catch (e) {
      console.log(`error log: ${e}`);
    }
  };

  closeModal = () => {
    // isModal, modalMessage 초기화
    const { modalFunction } = this.state;
    modalFunction();
    this.setState({ isModal: false, modalType: '', modalMessage: '', modalFunction: () => {} });
  };

  render() {
    const { state, props, type } = this;
    const { history, location } = props;
    const { currentType, myPointCount, myListCount, isModal, modalType, modalMessage } = state;
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
        {isModal && <Modal type={modalType} message={modalMessage} closeModal={this.closeModal} />}
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
    getPointSuccess: state.pender.success['dalgona/GET_MY_POINT'],
  }),
  (dispatch) => ({
    DalgonaActions: bindActionCreators(dalgonaActions, dispatch),
  })
)(PointContainer);
