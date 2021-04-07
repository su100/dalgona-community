import React from 'react';
import PageTemplate from 'components/common/PageTemplate';
import NavContainer from 'containers/NavContainer';
import FindIdContainer from 'containers/FindIdContainer';

const FindIdPage = ({ history, location }) => (
  <div>
    <PageTemplate header={<NavContainer history={history} location={location} isHome />}>
      <FindIdContainer history={history} />
    </PageTemplate>
  </div>
);

export default FindIdPage;
