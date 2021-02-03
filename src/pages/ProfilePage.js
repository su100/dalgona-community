import React from 'react';
import PageTemplate from 'components/common/PageTemplate';
import ProfileContainer from 'containers/ProfileContainer';

const ProfilePage = ({ history, location }) => {
    return (
        <div>
            <PageTemplate>
                <ProfileContainer />
            </PageTemplate>
        </div>
    );
};

export default ProfilePage;
