import React from 'react';
import PageTemplate from 'components/common/PageTemplate';
import EventBoardContainer from 'containers/EventBoardContainer';

const EventBoardPage = ({ history, location }) => {
    return (
        <div>
            <PageTemplate>
                <EventBoardContainer />
            </PageTemplate>
        </div>
    );
};

export default EventBoardPage;
