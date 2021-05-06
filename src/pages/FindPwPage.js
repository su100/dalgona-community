import React from 'react';
import PageTemplate from 'components/common/PageTemplate';
import NavContainer from 'containers/NavContainer';
import FindPwContainer from 'containers/FindPwContainer';

const FindPwPage = ({ history, location }) => (
  <div>
    <PageTemplate header={<NavContainer history={history} location={location} isHome />}>
      <FindPwContainer history={history} location={location} />
    </PageTemplate>
  </div>
);

export default FindPwPage;
