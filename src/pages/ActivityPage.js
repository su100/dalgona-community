import React from 'react';
import PageTemplate from 'components/common/PageTemplate';
import Header from 'components/common/Header';
import ActivityContainer from 'containers/ActivityContainer';

const ActivityPage = ({ history, location, match }) => {
    return (
        <div>
            <PageTemplate
                header={<Header history={history} match={match} location={location} isHome={false} />}
                nofooter={true}
            >
                <ActivityContainer />
            </PageTemplate>
        </div>
    );
};

export default ActivityPage;
