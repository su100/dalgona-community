import React from 'react';
import PageTemplate from 'components/common/PageTemplate';
import NavContainer from 'containers/NavContainer';
import ProfileContainer from 'containers/ProfileContainer';

const ProfilePage = ({ history, location }) => (
  <div>
    <PageTemplate header={<NavContainer history={history} location={location} isHome={false} />} nofooter>
      <ProfileContainer history={history} />
    </PageTemplate>
  </div>
);

export default ProfilePage;
