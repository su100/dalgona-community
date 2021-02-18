import React from 'react';
import PageTemplate from 'components/common/PageTemplate';
import Header from 'components/common/Header';
import EventBoardContainer from 'containers/EventBoardContainer';

const EventBoardPage = ({ history, location }) => {
    return (
        <div>
            <PageTemplate header={<Header history={history} location={location} isHome={true} />}>
                <EventBoardContainer />
            </PageTemplate>
        </div>
    );
};

export default EventBoardPage;
