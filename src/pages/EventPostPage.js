import React from 'react';
import PageTemplate from 'components/common/PageTemplate';
import Nav from 'components/common/Nav';
import EventPostContainer from 'containers/EventPostContainer';

const EventPostPage = ({ history, location }) => {
    return (
        <div>
            <PageTemplate header={<Nav history={history} location={location} isHome={true} />}>
                <EventPostContainer />
            </PageTemplate>
        </div>
    );
};

export default EventPostPage;
