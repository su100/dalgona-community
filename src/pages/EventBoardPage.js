import React from 'react';
import PageTemplate from 'components/common/PageTemplate';
import NavContainer from 'containers/NavContainer';
import EventBoardContainer from 'containers/EventBoardContainer';

const EventBoardPage = ({ history, location }) => {
    return (
        <div>
            <PageTemplate header={<NavContainer history={history} location={location} isHome={true} />}>
                <EventBoardContainer />
            </PageTemplate>
        </div>
    );
};

export default EventBoardPage;
