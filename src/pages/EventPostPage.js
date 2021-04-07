import React from 'react';
import PageTemplate from 'components/common/PageTemplate';
import NavContainer from 'containers/NavContainer';
import EventPostContainer from 'containers/EventPostContainer';

const EventPostPage = ({ history, location, match }) => (
  <div>
    <PageTemplate header={<NavContainer history={history} location={location} isHome />}>
      <EventPostContainer history={history} location={location} match={match} />
    </PageTemplate>
  </div>
);

export default EventPostPage;
