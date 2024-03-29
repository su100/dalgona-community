import React from 'react';
import PageTemplate from 'components/common/PageTemplate';
import NavContainer from 'containers/NavContainer';
import FreeBoardContainer from 'containers/FreeBoardContainer';

const FreeBoardPage = ({ history, location }) => (
  <div>
    <PageTemplate header={<NavContainer history={history} location={location} isHome />}>
      <FreeBoardContainer history={history} location={location} />
    </PageTemplate>
  </div>
);

export default FreeBoardPage;
