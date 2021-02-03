import React from 'react';
import PageTemplate from 'components/common/PageTemplate';
import EventPostContainer from 'containers/EventPostContainer';

const EventPostPage = ({ history, location }) => {
    return (
        <div>
            <PageTemplate>
                <EventPostContainer />
            </PageTemplate>
        </div>
    );
};

export default EventPostPage;
