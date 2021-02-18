import React from 'react';
import PageTemplate from 'components/common/PageTemplate';
import Header from 'components/common/Header';
import EventPostContainer from 'containers/EventPostContainer';

const EventPostPage = ({ history, location }) => {
    return (
        <div>
            <PageTemplate header={<Header history={history} location={location} isHome={true} />}>
                <EventPostContainer />
            </PageTemplate>
        </div>
    );
};

export default EventPostPage;
