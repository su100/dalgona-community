import React, { Component } from 'react';
import FindPw from 'components/FindPw';

class FindPwContainer extends Component {
  render() {
    const { history } = this.props;
    return (
      <>
        <FindPw history={history} />
      </>
    );
  }
}

export default FindPwContainer;
