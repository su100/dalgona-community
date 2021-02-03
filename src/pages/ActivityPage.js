import React from 'react';
import PageTemplate from 'components/common/PageTemplate';
import ActivityContainer from 'containers/ActivityContainer';

const ActivityPage = ({ history, location }) => {
    return (
        <div>
            <PageTemplate>
                <ActivityContainer />
            </PageTemplate>
        </div>
    );
};

export default ActivityPage;
