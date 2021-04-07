import React from 'react';
import PageTemplate from 'components/common/PageTemplate';
import NavContainer from 'containers/NavContainer';
import EventBoardContainer from 'containers/EventBoardContainer';

const EventBoardPage = ({ history, location }) => (
  <div>
    <PageTemplate header={<NavContainer history={history} location={location} isHome />}>
      <EventBoardContainer history={history} location={location} />
    </PageTemplate>
  </div>
);

export default EventBoardPage;
