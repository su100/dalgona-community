import React from 'react';
import PageTemplate from 'components/common/PageTemplate';
import NavContainer from 'containers/NavContainer';
import EventPostContainer from 'containers/EventPostContainer';

const EventPostPage = ({ history, location }) => {
    return (
        <div>
            <PageTemplate header={<NavContainer history={history} location={location} isHome={true} />}>
                <EventPostContainer />
            </PageTemplate>
        </div>
    );
};

export default EventPostPage;
