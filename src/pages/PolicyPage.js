import React from 'react';
import PageTemplate from 'components/common/PageTemplate';
import NavContainer from 'containers/NavContainer';
import Policy from 'components/Policy';

const PolicyPage = ({ history, match, location }) => (
  <div>
    <PageTemplate header={<NavContainer history={history} location={location} />}>
      <Policy history={history} match={match} />
    </PageTemplate>
  </div>
);

export default PolicyPage;
