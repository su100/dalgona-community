import React from 'react';
import PageTemplate from 'components/common/PageTemplate';
import NavContainer from 'containers/NavContainer';
import NoticePostContainer from 'containers/NoticePostContainer';

const NoticePostPage = ({ history, location, match }) => {
    return (
        <div>
            <PageTemplate header={<NavContainer history={history} location={location} isHome={true} />}>
                <NoticePostContainer history={history} location={location} match={match} />
            </PageTemplate>
        </div>
    );
};

export default NoticePostPage;
