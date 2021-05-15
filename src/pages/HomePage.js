import React from 'react';
import PageTemplate from 'components/common/PageTemplate';
import NavContainer from 'containers/NavContainer';
import HomeContainer from 'containers/HomeContainer';

const HomePage = ({ history, location, match }) => (
  <div>
    <PageTemplate header={<NavContainer history={history} location={location} match={match} isHome />}>
      <HomeContainer history={history} location={location} match={match} />
    </PageTemplate>
  </div>
);

export default HomePage;
