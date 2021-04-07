import React, { Component } from 'react';
import FindId from 'components/FindId';

class FindIdContainer extends Component {
  render() {
    const { history } = this.props;
    return (
      <>
        <FindId history={history} />
      </>
    );
  }
}

export default FindIdContainer;
