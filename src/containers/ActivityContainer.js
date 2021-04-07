import React, { Component } from 'react';
import queryString from 'query-string';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as dalgonaActions from 'store/modules/dalgona';
import Activity from 'components/Activity';

class ActivityContainer extends Component {
  componentDidMount() {
    const { isAuthenticated, history } = this.props;
    if (!isAuthenticated) {
      alert('로그인이 필요합니다.');
      history.push('/login');
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

  render() {
    const { history, location, myPostCount, myPost } = this.props;
    return (
      <>
        <Activity
          history={history}
          location={location}
          myPostCount={myPostCount}
          myPost={myPost}
          getMyPost={this.getMyPost}
        />
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
