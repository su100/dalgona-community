import React from 'react';
import PageTemplate from 'components/common/PageTemplate';
import Header from 'components/common/Header';
import ProfileContainer from 'containers/ProfileContainer';

const ProfilePage = ({ history, location }) => {
    return (
        <div>
            <PageTemplate header={<Header history={history} location={location} isHome={false} />}>
                <ProfileContainer />
            </PageTemplate>
        </div>
    );
};

export default ProfilePage;
