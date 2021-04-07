import React from 'react';
import PageTemplate from 'components/common/PageTemplate';
import NavContainer from 'containers/NavContainer';
import WriteContainer from 'containers/WriteContainer';

const WritePage = ({ history, location, match }) => (
  <div>
    <PageTemplate header={<NavContainer history={history} location={location} isHome />} nofooter>
      <WriteContainer history={history} match={match} location={location} />
    </PageTemplate>
  </div>
);

export default WritePage;
