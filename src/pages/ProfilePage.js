import React from 'react';
import PageTemplate from 'components/common/PageTemplate';
import Nav from 'components/common/Nav';
import ProfileContainer from 'containers/ProfileContainer';

const ProfilePage = ({ history, location }) => {
    return (
        <div>
            <PageTemplate header={<Nav history={history} location={location} isHome={false} />} nofooter={true}>
                <ProfileContainer />
            </PageTemplate>
        </div>
    );
};

export default ProfilePage;
