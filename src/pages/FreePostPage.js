import React from 'react';
import PageTemplate from 'components/common/PageTemplate';
import NavContainer from 'containers/NavContainer';
import FreePostContainer from 'containers/FreePostContainer';

const FreePostPage = ({ history, location, match }) => (
  <div>
    <PageTemplate header={<NavContainer history={history} location={location} isHome />}>
      <FreePostContainer history={history} location={location} match={match} />
    </PageTemplate>
  </div>
);

export default FreePostPage;
