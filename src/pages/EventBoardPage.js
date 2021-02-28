import React from 'react';
import PageTemplate from 'components/common/PageTemplate';
import Nav from 'components/common/Nav';
import EventBoardContainer from 'containers/EventBoardContainer';

const EventBoardPage = ({ history, location }) => {
    return (
        <div>
            <PageTemplate header={<Nav history={history} location={location} isHome={true} />}>
                <EventBoardContainer />
            </PageTemplate>
        </div>
    );
};

export default EventBoardPage;
