import React from 'react';
import PageTemplate from 'components/common/PageTemplate';
import NavContainer from 'containers/NavContainer';
import ActivityContainer from 'containers/ActivityContainer';

const ActivityPage = ({ history, location, match }) => (
  <div>
    <PageTemplate header={<NavContainer history={history} match={match} location={location} isHome={false} />} nofooter>
      <ActivityContainer history={history} location={location} />
    </PageTemplate>
  </div>
);

export default ActivityPage;
