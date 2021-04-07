import React from 'react';
import PageTemplate from 'components/common/PageTemplate';
import NavContainer from 'containers/NavContainer';
import LunaBoardContainer from 'containers/LunaBoardContainer';

const LunaBoardPage = ({ history, location }) => (
  <div>
    <PageTemplate header={<NavContainer history={history} location={location} isHome />}>
      <LunaBoardContainer history={history} location={location} />
    </PageTemplate>
  </div>
);

export default LunaBoardPage;
