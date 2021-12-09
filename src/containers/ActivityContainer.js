import React, { Component } from 'react';
import queryString from 'query-string';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as dalgonaActions from 'store/modules/dalgona';
import Activity from 'components/Activity';
import Modal from 'components/common/Modal';

class ActivityContainer extends Component {
  constructor() {
    super();
    this.state = {
      isAlert: false,
      modalMessage: '',
      modalFunction: () => {},
    };
  }

  componentDidMount() {
    const { isAuthenticated, history } = this.props;
    if (!isAuthenticated) {
      this.setState({
        isAlert: true,
        modalMessage: '로그인이 필요합니다.',
        modalFunction: () => history.push('/login'),
      });
    } else {
      this.getMyPost(1);
    }
  }

  getSnapshotBeforeUpdate(prevProps) {
    //  주소 바뀔 때
    const { location } = this.props;
    if (prevProps.location !== location) {
      return true;
    }
    return null;
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (snapshot) {
      const { location } = this.props;
      const query = queryString.parse(location.search);
      this.getMyPost(query.page);
    }
  }

  getMyPost = async (page) => {
    const { DalgonaActions } = this.props;
    try {
      await DalgonaActions.getMyPost(page);
    } catch (e) {
      console.log(`error log: ${e}`);
    }
  };

  closeModal = () => {
    // isAlert, modalMessage 초기화
    const { modalFunction } = this.state;
    modalFunction();
    this.setState({ isAlert: false, modalMessage: '', modalFunction: () => {} });
  };

  render() {
    const { history, location, myPostCount, myPost } = this.props;
    const { isAlert, modalMessage } = this.state;
    return (
      <>
        <Activity
          history={history}
          location={location}
          myPostCount={myPostCount}
          myPost={myPost}
          getMyPost={this.getMyPost}
        />
        {isAlert && <Modal type="alert" message={modalMessage} closeModal={this.closeModal} />}
      </>
    );
  }
}

export default connect(
  (state) => ({
    isAuthenticated: state.auth.get('isAuthenticated'),
    myPostCount: state.dalgona.get('myPostCount'),
    myPost: state.dalgona.get('myPost'),
    myPoint: state.dalgona.get('myPoint'),
  }),
  (dispatch) => ({
    DalgonaActions: bindActionCreators(dalgonaActions, dispatch),
  })
)(ActivityContainer);
