import React from 'react';
import PageTemplate from 'components/common/PageTemplate';
import Nav from 'components/common/Nav';
import ActivityContainer from 'containers/ActivityContainer';

const ActivityPage = ({ history, location, match }) => {
    return (
        <div>
            <PageTemplate
                header={<Nav history={history} match={match} location={location} isHome={false} />}
                nofooter={true}
            >
                <ActivityContainer />
            </PageTemplate>
        </div>
    );
};

export default ActivityPage;
