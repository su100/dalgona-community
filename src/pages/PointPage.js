import React from 'react';
import PageTemplate from 'components/common/PageTemplate';
import NavContainer from 'containers/NavContainer';
import PointContainer from 'containers/PointContainer';

const PointPage = ({ history, location }) => (
  <div>
    <PageTemplate header={<NavContainer history={history} location={location} isHome={false} />} nofooter>
      <PointContainer history={history} location={location} />
    </PageTemplate>
  </div>
);

export default PointPage;
